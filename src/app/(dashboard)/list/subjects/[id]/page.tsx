import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FormContainer from "@/components/FormContainer";
import Image from "next/image";
import Link from "next/link";

export default async function SingleSubjectPage({ params, searchParams }: {
  params: { id: string },
  searchParams: { search?: string }
}) {
  const subjectId = Number(params.id);
  if (isNaN(subjectId)) return notFound();

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
    include: {
      semester: true,
      components: {
        include: {
          materials: true,
        },
      },
    },
  });

  if (!subject) return notFound();

  // Flatten study materials with component type for display
  const allMaterials = subject.components.flatMap((component) =>
    component.materials.map((material) => ({
      id: material.id,
      title: material.title,
      description: material.description || "",
      url: material.url || "#",
      componentType: component.type,
    }))
  );

  // Apply search filter
  const searchQuery = searchParams.search?.toLowerCase() || "";
  const filteredMaterials = allMaterials.filter((material) =>
    material.title.toLowerCase().includes(searchQuery) ||
    material.description.toLowerCase().includes(searchQuery)
  );

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    { header: "Component Type", accessor: "componentType" },
    ...((role === "admin" || role === "teacher")
      ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
      : []),
  ];

  const renderRow = (item: typeof filteredMaterials[0]) => (
      <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-100">
        <td className="flex items-center gap-4 p-4">{item.title}</td>
        <td className="hidden md:table-cell">{item.description}</td>
        <td className="hidden md:table-cell">{item.componentType}</td>
        <td>
            <div className="flex items-center gap-2">
                <Link href={item.url} key={item.id} target="_blank">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#8ce0ff]" >
                    <Image src="/download.png" alt="" width={16} height={16} />
                    </button>
                </Link>
                {(role === "admin" || role === "teacher") && (
                    <>
                    {/* <FormContainer table="studyMaterial" type="update" data={item} /> */}
                    <FormContainer table="studyMaterial" type="delete" id={item.id} />
                    </>
                )}
            </div>
        </td>
      </tr>
  );

  return (
    <div className="flex-1 p-4 flex flex-col gap-4">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="text-xl font-semibold text-gray-800">
          Study Materials for {subject.name} ({subject.code})
        </h1>
        <div className="flex items-center gap-3">
          <TableSearch/>
          {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200">
            <Image src="/filter.png" alt="Filter" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200">
            <Image src="/sort.png" alt="Sort" width={14} height={14} />
          </button> */}
          {/* {(role === "admin" || role === "teacher") && (
            <FormContainer table="studyMaterial" type="create" />
          )} */}
        </div>
      </div>

      {/* MATERIAL TABLE */}
      <div className="bg-white p-4 rounded-lg shadow">
        {filteredMaterials.length > 0 ? (
          <Table columns={columns} data={filteredMaterials} renderRow={renderRow} />
        ) : (
          <p className="text-sm text-gray-500">No study materials found.</p>
        )}
      </div>
    </div>
  );
}

