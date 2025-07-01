"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { studyMaterialSchema, StudyMaterialSchema } from "@/lib/formValidationSchemas";
import { createStudyMaterial, updateStudyMaterial } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";

export default function StudyMaterialForm({
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
  const router = useRouter();
  const [uploadedUrl, setUploadedUrl] = useState<string | undefined>(data?.url);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StudyMaterialSchema>({
    resolver: zodResolver(studyMaterialSchema),
    // defaultValues: {
    //   title: data?.title || "",
    //   description: data?.description || "",
    //   subjectComponentId: data?.subjectComponentId || undefined,
    //   url: data?.url || "",
    // },
  });

  const [state, formAction] = useActionState(
    type === "create" ? createStudyMaterial : updateStudyMaterial,
    { success: false, error: false }
  );

  const onSubmit = handleSubmit((formData) => {
    const payload = {
      ...formData,
      url: uploadedUrl || "", // Required for file/image URL
      ...(type === "update" && data?.id ? { id: data.id } : {}),
    };
    formAction(payload);
  });

  // const onSubmit = handleSubmit(formData => {
  //     if (type === "update" && data?.id) {
  //       formAction({ ...formData, id: data.id, url: uploadedUrl?.secure_url });
  //     } else {
  //       formAction({ ...formData, url: uploadedUrl?.secure_url });
  //     }
  //   });

  useEffect(() => {
    if (state.success) {
      toast(`Study Material has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { subjectComponents } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Study Material" : "Update the Study Material"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Study Material Title"
          name="title"
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Description"
          name="description"
          register={register}
          error={errors?.description}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Component (Theory/Lab)</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjectComponentId")}
            defaultValue={data?.subjectComponentId}
          >
            <option value="">-- Select Component --</option>
            {subjectComponents.map((component: { id: number; type: string }) => (
              <option value={component.id} key={component.id}>
                {component.type}
              </option>
            ))}
          </select>
          {errors.subjectComponentId?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectComponentId.message.toString()}
            </p>
          )}
        </div>

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
            resourceType: "auto", // allow both image and file
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
                <Link
                  href={uploadedUrl}
                  target="_blank"
                  className="text-blue-500 text-xs underline mt-1"
                >
                  View Uploaded File
                </Link>
              )}
            </div>
          )}
        </CldUploadWidget>
      </div>

      {state.error && <span className="text-red-500">Something went wrong!</span>}

      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
