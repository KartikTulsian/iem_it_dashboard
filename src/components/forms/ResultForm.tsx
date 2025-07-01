"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, useActionState, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { resultSchema, ResultSchema } from '@/lib/formValidationSchemas';
import { createResult, updateResult } from '@/lib/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

export default function ResultForm({
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
    setValue,
    watch,
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema),
    // defaultValues: {
    //   id: data?.id,
    //   gpa: data?.gpa,
    //   remarks: data?.remarks,
    //   url: data?.url,
    //   studentId: data?.studentId || '',
    //   semesterId: data?.semesterId,
    // },
  });

  // const [resultType, setResultType] = React.useState(data?.resultType || '');

  const [state, formAction] = useActionState(
    type === "create" ? createResult : updateResult,
    {
      success: false,
      error: false,
    }
  );

  const router = useRouter()
  const [uploadedUrl, setUploadedUrl] = useState<string | undefined>(data?.url);

  const onSubmit = handleSubmit((formData) => {
    const payload = {
      ...formData,
      url: uploadedUrl || "", // Required for file/image URL
      ...(type === "update" && data?.id ? { id: data.id } : {}),
    };
    formAction(payload);
  });

  useEffect(() => {
    if (state.success) {
      toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { students, semesters } = relatedData;

  // const selectedSemesterId = watch("semesterId");

  // const filteredStudents = useMemo(() => {
  //   return selectedSemesterId
  //     ? students.filter((student: { semesterId: number; }) => student.semesterId === Number(selectedSemesterId))
  //     : [];
  // }, [selectedSemesterId, students]);

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>{type === "create" ? "Create a new Result" : "Update the Result"}</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Semester</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("semesterId")}
          >
            <option value="">Select Semester</option>
            {semesters.map((semester: { id: string, name: string, }) => (
              <option value={semester.id} key={semester.id}>
                {semester.name}
              </option>
            )
            )}
          </select>
          {errors.studentId?.message && (
            <p className="text-xs text-red-400">
              {errors.studentId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("studentId")}
          >
            <option value="">Select Student</option>
            {students.map((student: { id: string, name: string, surname: string }) => (
              <option value={student.id} key={student.id}>
                {student.id}
              </option>
            ))}
          </select>
          {errors.studentId?.message && (
            <p className="text-xs text-red-400">
              {errors.studentId.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="SGPA"
          name="gpa"
          defaultValue={data?.gpa}
          register={register}
          error={errors?.gpa}
        />
        <InputField
          label="Remarks"
          name="remarks"
          defaultValue={data?.remarks}
          register={register}
          error={errors?.remarks}
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
        {/* File Upload */}
        <CldUploadWidget
          uploadPreset="iem_it"
          onSuccess={(result, { widget }) => {
            const secureUrl = (result?.info as any)?.secure_url;
            if (secureUrl) {
              setUploadedUrl(secureUrl);
              setValue("url", secureUrl);
            }
            widget.close();
          }}
          options={{
            sources: ["local", "url", "camera", "image_search", "google_drive", "dropbox"],
            multiple: false,
            resourceType: "auto",
          }}
        >
          {({ open }) => (
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Upload File or Image</label>
              <div
                className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer ring-[1.5px] ring-gray-300 px-3 py-2 rounded-md"
                onClick={() => open()}
              >
                <Image src="/upload.png" alt="upload" width={28} height={28} />
                <span>Upload PDF/Image</span>
              </div>
              {uploadedUrl && (
                <a
                  href={uploadedUrl}
                  target="_blank"
                  className="text-blue-500 text-xs underline mt-1"
                >
                  View Uploaded File
                </a>
              )}
            </div>
          )}
        </CldUploadWidget>
      </div>
      {state.error && <span className='text-red-500'>Something went wrong!</span>}
      <button className='bg-blue-400 text-white p-2 rounded-md cursor-pointer'>
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  )
}


