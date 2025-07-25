"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { examSchema, ExamSchema } from '@/lib/formValidationSchemas';
import { createExam, updateExam } from '@/lib/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ExamForm({
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
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createExam : updateExam,
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
        toast(`Exam has been ${type === "create" ? "created" : "updated"}!`);
        setOpen(false);
        router.refresh();
    }
  }, [state]);

  const { examSubjectComponents } = relatedData;

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>{type === "create" ? "Create a new Exam" : "Update the Exam"}</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Exam Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
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
          <label className="text-xs text-gray-500">Subject Component</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjectComponentId")}
            defaultValue={data?.subjectComponentId}
          >
            <option value="">-- Select a Component --</option>
            {examSubjectComponents.map(
              (component: {
                id: number;
                type: "THEORY" | "LAB";
                subject: {
                  id: number;
                  name: string;
                  code: string;
                  semesterId: number;
                };
              }) => (
                <option value={component.id} key={component.id}>
                  {component.subject.name} ({component.type})
                </option>
              )
            )}
          </select>
          {errors.subjectComponentId?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectComponentId.message.toString()}
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


