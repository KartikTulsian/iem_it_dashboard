import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import { Prisma, Semester, Subject, SubjectComponent, Teacher } from '@prisma/client'
import { ITEM_PER_PAGE } from '@/lib/settings'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import FormContainer from '@/components/FormContainer'
import Link from 'next/link'

type SubjectList = Subject & { 
  teachers: Teacher[];
  semester: Semester;
  components: SubjectComponent[]; 
};

export default async function SubjectListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
      header: "Subject Code",
      accessor: "code",
    },
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Semester",
      accessor: "semesterId",
      className: "hidden md:table-cell",
    },
    {
      header: "Teachers",
      accessor: "teachers",
      className: "hidden md:table-cell",
    },
    {
      header: "Type",
      accessor: "componentType",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.code}</td>
      <td>{item.name}</td>
      <td className="hidden md:table-cell">{item.semesterId}</td>
      <td className="hidden md:table-cell">
        {item.teachers.map(teacher => teacher.name).join(",")}
      </td>
      <td className="hidden md:table-cell">
        {[...new Set(item.components.map(c => c.type))].join(", ")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/subjects/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#8ce0ff]" >
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <>
              <FormContainer table="subject" type="update" data={item} />
              <FormContainer table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const andConditions: Prisma.SubjectWhereInput[] = [];

  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "semesterId":
          case "semId":
            query.semesterId = parseInt(value);
            break;
          case "componentType":
          case "type":
            query.components = {
              some: {
                type: value.toUpperCase() as "THEORY" | "LAB",
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }



  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
        components: true,
        semester: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);


  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className='hidden md:block text-lg fint-semibold'>All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]'>
              <Image src="/filter.png" alt='' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]'>
              <Image src="/sort.png" alt='' width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormContainer table="subject" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  )
}
