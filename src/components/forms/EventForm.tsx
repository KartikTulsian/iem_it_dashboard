"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { eventSchema, EventSchema } from '@/lib/formValidationSchemas';
import { createEvent, updateEvent, } from '@/lib/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

export default function EventForm({
  type, 
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  relatedData?: any;
}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const [img, setImg] = useState<any>()

  const [state, formAction] = useActionState(
    type === "create" ? createEvent : updateEvent,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit(formData => {
    if (type === "update" && data?.id) {
      formAction({ ...formData, id: data.id, img: img?.secure_url });
    } else {
      formAction({ ...formData, img: img?.secure_url });
    }
  });

  const router = useRouter()

  useEffect(() => {
    if (state.success) {
        toast(`Event has been ${type === "create" ? "created" : "updated"}!`);
        setOpen(false);
        router.refresh();
    }
  }, [state]);

  const { years, semesters } = relatedData;

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>{type === "create" ? "Create a new Event" : "Update the Event"}</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Event Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
        <InputField
          label="Start Date"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          error={errors?.startTime}
          type='datetime-local'
        />
        <InputField
          label="End Date"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          error={errors?.endTime}
          type='datetime-local'
        />
        {data && (
            <InputField
                label="ID"
                name="id"
                defaultValue={data?.id}
                register={register}
                error={errors?.id}
                hidden
            />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Year</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("yearId")}
            defaultValue={data?.yearId}
          >
            <option value="">Select Year</option>
            {years.map((year: {id: number; name: string;}) => (
                <option value={year.id} key={year.id}>
                    {year.name}
                </option>
                )
            )}
          </select>
          {errors.yearId?.message && (
            <p className="text-xs text-red-400">
              {errors.yearId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Semester</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("semesterId")}
            defaultValue={data?.semesterId}
          >
            <option value="">Select Semester</option>
            {semesters.map((semester: {id: number; name: string;}) => (
                <option value={semester.id} key={semester.id}>
                    {semester.name}
                </option>
                )
            )}
          </select>
          {errors.semesterId?.message && (
            <p className="text-xs text-red-400">
              {errors.semesterId.message.toString()}
            </p>
          )}
        </div>
        <CldUploadWidget 
          uploadPreset="iem_it" 
          onSuccess={(result, {widget}) => {
            setImg(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div className='flex flex-col gap-2 w-full md:w-1/4'>
                <label className="text-xs text-gray-500">Profile Picture</label>
                <div
                  className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer ring-[1.5px] ring-gray-300 px-3 py-2 rounded-md"
                  onClick={()=> open()}
                >
                  <Image src="/upload.png" alt="" width={28} height={28} />
                  <span>Upload a photo</span>
                </div>
              </div>

            );
          }}
        </CldUploadWidget>
      </div>
      {state.error && <span className='text-red-500'>Something went wrong!</span>}
      <button className='bg-blue-400 text-white p-2 rounded-md cursor-pointer'>
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  )
}


