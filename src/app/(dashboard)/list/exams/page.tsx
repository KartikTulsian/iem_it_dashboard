import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import { ComponentType, Exam, Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import FormContainer from '@/components/FormContainer'

type ExamList = Exam & {
  subjectComponent: {
    type: string;
    subject: {
      name: string;
      semester: {
        id: number;
        name: string;
      };
    };
  };
};

export default async function ExamListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  const columns = [
    {
      header: "Exam Name",
      accessor: "title",
    },
    {
      header: "Component Type",
      accessor: "componentType",
      className: "hidden md:table-cell",
    },
    {
      header: "Start Time",
      accessor: "startTime",
    },
    {
      header: "End Time",
      accessor: "endTime",
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
  ];

  const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{`${item.title} - ${item.subjectComponent.subject.name}`}</td>
      <td className="hidden md:table-cell">{item.subjectComponent.type}</td>
      <td>
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(item.startTime))}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(item.endTime))}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="exam" type="update" data={item} />
              <FormContainer table="exam" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.ExamWhereInput = {};

  // query.lesson = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "subjectComponentId":
            query.subjectComponentId = parseInt(value);
            break;
          case "search":
          const isComponentType = ["THEORY", "LAB"].includes(value.toUpperCase());
          query.OR = [
            {
              title: {
                contains: value,
                mode: "insensitive",
              },
            },
            {
              subjectComponent: {
                subject: {
                  name: {
                    contains: value,
                    mode: "insensitive",
                  },
                },
              },
            },
          ];

          // Only add this clause if it's a valid ComponentType enum value
          if (isComponentType) {
            query.OR.push({
              subjectComponent: {
                type: {
                  equals: value.toUpperCase() as ComponentType,
                },
              },
            });
          }
          break;

          default:
            break;
        }
      }
    }
  }

  // // ROLE CONDITIONS

  switch (role) {
    case "admin":
      break;
    case "teacher":
      // See all exams
      break;
    case "student":
      const student = await prisma.student.findUnique({
        where: { id: currentUserId! },
        select: { semesterId: true },
      });

      if (student?.semesterId) {
        query.subjectComponent = {
          subject: {
            semesterId: student.semesterId,
          },
        };
      }
      break;
    default:
      break;
  }

  // ✅ Fetch data and count
  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        subjectComponent: {
          select: {
            type: true,
            subject: {
              select: {
                name: true,
                semester: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      orderBy: [
        {
          subjectComponent: {
            subject: {
              semester: { id: 'asc' },
            },
          },
        },
        { startTime: 'asc' },
      ],
    }),
    prisma.exam.count({ where: query }),
  ]);

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className='hidden md:block text-lg fint-semibold'>All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]'>
              <Image src="/filter.png" alt='' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]'>
              <Image src="/sort.png" alt='' width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (<FormContainer table="exam" type="create" />)}
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
