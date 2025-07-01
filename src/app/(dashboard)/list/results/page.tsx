import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FormModal from '@/components/FormModal'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import FormContainer from '@/components/FormContainer'

type ResultList = {
  id: number;
  studentId: string;
  username: string;
  gpa: number;
  remarks: string | null;
  semesterName: string;
  url?: string | null;
};

export default async function ResultListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;


  const columns = [
    {
      header: "Semester",
      accessor: "semesterName",
    },
    ...(role === "admin" || role === "teacher"
      ? [
        {
          header: "Student ID",
          accessor: "studentId",
        },
      ]
      : []),
    ...(role === "admin" || role === "teacher"
      ? [
        {
          header: "Username",
          accessor: "username",
        },
      ]
      : []),
    {
      header: "SGPA",
      accessor: "gpa",
    },
    {
      header: "Remarks",
      accessor: "remarks",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
      : []),
    ...(role === "student"
      ? [
        {
          header: "Download",
          accessor: "download",
        },
      ]
      : []),
  ];

  

  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.ResultWhereInput = {};

  // if (queryParams) {
  //   for (const [key, value] of Object.entries(queryParams)) {
  //     if (value !== undefined) {
  //       switch (key) {
  //         case "studentId":
  //           query.studentId = value;
  //           break;
  //         case "search":
  //           query.OR = [
  //             { exam: { title: { contains: value, mode: "insensitive" } } },
  //             { student: { name: { contains: value, mode: "insensitive" } } },
  //           ];
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   }
  // }

  if (queryParams.search) {
    const value = queryParams.search;
    query.OR = [
      { student: { id: { contains: value, mode: "insensitive" } } },
      { student: { username: { contains: value, mode: "insensitive" } } },
      { semester: { name: { contains: value, mode: "insensitive" } } },
    ];
  }

  // ✅ Restrict by user role
  // if (role === "student") {
  //   query.studentId = currentUserId!;
  // }

  // ROLE CONDITIONS

  switch (role) {
    case "admin":
      break;
    case "teacher":
      break;

    case "student":
      query.studentId = currentUserId!;
      break;
    default:
      break;
  }

  // ✅ Fetch data with sorting: Semester ASC, GPA DESC
  const [results, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { id: true, username: true } },
        semester: true,
      },
      skip: (p - 1) * ITEM_PER_PAGE,
      take: ITEM_PER_PAGE,
      orderBy: [
        { semester: { name: "asc" } },
        { gpa: "desc" },
      ],
    }),
    prisma.result.count({ where: query }),
  ]);

  const data: ResultList[] = results.map(result => ({
    id: result.id,
    studentId: result.student.id,
    username: result.student.username,
    gpa: result.gpa,
    remarks: result.remarks,
    semesterName: result.semester.name,
    url: result.url || null,
  }));

  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.semesterName}</td>
      {(role === "admin" || role === "teacher") && (
        <>
          <td>{item.studentId}</td>
          <td>{item.username}</td>
        </>
      )}
      <td>{item.gpa}</td>
      <td className="hidden md:table-cell">
        {item.remarks || "-"}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {item.url && (
            <Link href={item.url} target="_blank">
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#8ce0ff]">
                <Image src="/download.png" alt="Download" width={16} height={16} />
              </button>
            </Link>
          )}
          {(role === "admin" || role === "teacher") && (
              <>
              <FormContainer table="result" type="update" data={item} />
              <FormContainer table="result" type="delete" id={item.id} />
              </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className='hidden md:block text-lg fint-semibold'>All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]'>
              <Image src="/filter.png" alt='' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]'>
              <Image src="/sort.png" alt='' width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (<FormContainer table="result" type="create" />)}
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
