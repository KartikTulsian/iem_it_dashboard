import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import { Event, Prisma, Semester, Year } from '@prisma/client'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import FormContainer from '@/components/FormContainer'

type EventList = Event & {
  year: Year | null,
  semester: Semester | null,
};

export default async function EventListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  const columns = [
    {
      header: "Image",
      accessor: "img",
      className: "hidden md:table-cell",
    },
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Description",
      accessor: "description",
      className: "hidden md:table-cell",
    },
    {
      header: "Year",
      accessor: "yearId",
      className: "hidden md:table-cell",
    },
    {
      header: "Semester",
      accessor: "semesterId",
      className: "hidden md:table-cell",
    },
    // {
    //   header: "Date",
    //   accessor: "date",
    //   className: "hidden md:table-cell",
    // },
    {
      header: "Start Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      header: "End Time",
      accessor: "endTime",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
      : []),
  ];

  const renderRow = (item: EventList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="hidden md:table-cell p-4">
        {item.img ? (
          <Image
            src={item.img}
            alt={item.title}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
        ) : (
          <div className="text-gray-400 italic">No Image</div>
        )}
      </td>
      <td className="p-4">{item.title}</td>
      <td className="hidden md:table-cell">{item.description || "-"}</td>
      <td className="hidden md:table-cell">{item.year?.name || "-"}</td>
      <td className="hidden md:table-cell">{item.semester?.name || "-"}</td>
      <td className="hidden md:table-cell">
        {item.startTime.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>
      <td className="hidden md:table-cell">
        {item.endTime.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="event" type="update" data={item} />
              <FormContainer table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.EventWhereInput = {
    endTime: {
      gte: new Date(), // Only upcoming or ongoing events
    },
  };

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS

  // const roleConditions = {
  //   student: { students: { some: { id: currentUserId! } } },
  // };

  // if (role === "student") {
  //   query.OR = [
  //     { yearId: null, semesterId: null },
  //     {
  //       year: roleConditions[role as keyof typeof roleConditions],
  //       semester: roleConditions[role as keyof typeof roleConditions],
  //     },
  //   ];
  // } 

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        year: true,
        semester: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      orderBy: {
        startTime: 'asc',
      },
    }),
    prisma.event.count({ where: query }),
  ]);

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className='hidden md:block text-lg fint-semibold'>All Events</h1>
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
              <FormContainer table="event" type="create" />
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
