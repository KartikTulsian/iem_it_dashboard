"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { classSchema, ClassSchema } from '@/lib/formValidationSchemas';
import { createClass, createSubject, updateClass, updateSubject } from '@/lib/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ClassForm({
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
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createClass : updateClass,
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
        toast(`Class has been ${type === "create" ? "created" : "updated"}!`);
        setOpen(false);
        router.refresh();
    }
  }, [state]);

  const { teachers, grades } = relatedData;

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>{type === "create" ? "Create a new Class" : "Update the Class"}</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
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
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("supervisorId")}
            defaultValue={data?.teachers}
          >
            {teachers.map((teacher: {id: string; name: string; surname: string}) => (
                <option value={teacher.id} key={teacher.id} selected={data && teacher.id === data.supervisorId}>
                    {teacher.name + " " + teacher.surname}
                </option>
                )
            )}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades.map((grade: {id: number; level: number}) => (
                <option value={grade.id} key={grade.id} selected={data && grade.id === data.gradeId}>
                    {grade.level}
                </option>
                )
            )}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId.message.toString()}
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


