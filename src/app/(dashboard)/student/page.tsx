import Announcements from '@/components/Announcements'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import EventCalendarContainer from '@/components/EventCalendarContainer'
import RoutineCard from '@/components/RoutineCard'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

export default async function StudentPage({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) {
  const { userId } = await auth();

  if (!userId) return <div>Unauthorized</div>;

  const student = await prisma.student.findUnique({
    where: {
      id: userId,
    },
    include: {
      year: true,
      semester: true, // ✅ Add this line
    },
  });


  if (!student || !student.year) return <div>Student data not found</div>;

  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className='text-xl font-semibold'>
            Routine for Your Current Semester
          </h1>
          <RoutineCard semester={student.semester.name} />
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
