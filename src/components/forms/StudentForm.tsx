"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod";
import Image from "next/image";
import InputField from '../InputField';
import { studentSchema, StudentSchema } from '@/lib/formValidationSchemas';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { createStudent, updateStudent,} from '@/lib/actions';
import { CldUploadWidget } from 'next-cloudinary';

export default function StudentForm({
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
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });

  const [img, setImg] = useState<any>()

  const [state, formAction] = useActionState(
    type === "create" ? createStudent : updateStudent,
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
      toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { years, semesters } = relatedData;

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>{type === "create" ? "Create a new Student" : "Update the Student"}</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <InputField
          label="Mentor Id"
          name="mentorId"
          defaultValue={data?.mentorId}
          register={register}
          error={errors.mentorId}
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
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="">Select Sex</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Year</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("yearId")}
            defaultValue={data?.yearId}
          >
            {years.map((year: { id: number; name: string }) => (
              <option value={year.id} key={year.id}>{year.name}</option>
            ))}
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
            {semesters.map((semester: { id: number; name: string; }) => (
              <option value={semester.id} key={semester.id}>
                {semester.name}
              </option>
            ))}
          </select>
          {errors.semesterId?.message && (
            <p className="text-xs text-red-400">
              {errors.semesterId.message.toString()}
            </p>
          )}
        </div>
        {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label className="text-xs text-gray-500">Profile Picture</label>
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer ring-[1.5px] ring-gray-300 p-2 rounded-md"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div> */}
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
      <button className='bg-blue-400 text-white p-2 rounded-md'>
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  )
}
