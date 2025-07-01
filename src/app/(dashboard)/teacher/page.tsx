import Announcements from '@/components/Announcements'
import EventCalendarContainer from '@/components/EventCalendarContainer'
import YearWiseMenteesCard from '@/components/YearWiseMenteesCard'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import React from 'react'

export default async function TeacherPage({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) {
  const { userId } = await auth();

  if (!userId) return <div>Unauthorized</div>;

  const teacher = await prisma.teacher.findUnique({
    where: {
      id: userId,
    },
    include: {
      mentees: {
        include: {
          year: true,
        },
      },
    },
  });

  if (!teacher) return <div>Teacher data not found</div>;

  return (
    <div className='flex-1 p-4 flex gap-4 flex-col xl:flex-row'>
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className='text-xl font-semibold'>Mentees</h1>
          <YearWiseMenteesCard teacher={teacher} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
}
