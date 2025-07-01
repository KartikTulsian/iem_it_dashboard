"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { subjectSchema, SubjectSchema } from '@/lib/formValidationSchemas';
import { createSubject, updateSubject } from '@/lib/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function SubjectForm({
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
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit(formData => {
  if (type === "update" && data?.id) {
    formAction({ ...formData, id: data.id });
  } else {
    formAction(formData);
  }
});

  const router = useRouter()

  useEffect(() => {
    if (state.success) {
        toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
        setOpen(false);
        router.refresh();
    }
  }, [state]);

  const { teachers } = relatedData;

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>{type === "create" ? "Create a new Subject" : "Update the Subject"}</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject Code"
          name="code"
          defaultValue={data?.code}
          register={register}
          error={errors?.code}
        />
        <InputField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Semester"
          name="semesterId"
          defaultValue={data?.semesterId}
          register={register}
          error={errors?.semesterId}
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
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teachers")}
            defaultValue={data?.teachers}
          >
            {teachers.map((teacher: {id: string; name: string; surname: string}) => (
                <option value={teacher.id} key={teacher.id}>
                    {teacher.name + " " + teacher.surname}
                </option>
                )
            )}
          </select>
          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subject Type</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("type")}
            defaultValue={data?.type}
          >
            <option value="">Select Type</option>
            <option value="THEORY">Theory</option>
            <option value="LAB">Lab</option>
          </select>
          {errors.type?.message && (
            <p className="text-xs text-red-400">
              {errors.type.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && <span className='text-red-500'>Something went wrong!</span>}
      <button className='bg-blue-400 text-white p-2 rounded-md cursor-pointer'>
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  )
}


