import Announcements from '@/components/Announcements'
import FormContainer from '@/components/FormContainer'
import Performance from '@/components/Performance'
import RoutineCard from '@/components/RoutineCard'
import StudentAttendanceCard from '@/components/StudentAttendanceCard'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Semester, Student, Teacher, Year } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

export default async function SingleStudentPage(props: { params: { id: string } }) {
  const { id } = await props.params;
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const student:
    | (Student & {
        year: Year,
        semester: Semester,
        mentor: Teacher | null
      })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      year: true,
      semester: true,
      mentor: true,
    },
  });

  if(!student) {
    return notFound();
  }
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD*/}
          <div className="bg-[#C3EBFA] py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={student.img || "/noAvatar.png"}
                alt=''
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">{student.name + " " + student.surname}</h1>
                {role === "admin" && (
                  <div className="bg-[#8286ff] px-1 py-1 rounded-full text-sm font-medium">
                    <FormContainer table="student" type="update" data={student} />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">Mentored by {student.mentor?.name || "N/A"}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center  gap-2">
                  <Image src='/blood.png' alt='' width={14} height={14} />
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center  gap-2">
                  <Image src='/date.png' alt='' width={14} height={14} />
                  <span>{new Intl.DateTimeFormat("en-GB").format(student.birthday)}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center  gap-2">
                  <Image src='/mail.png' alt='' width={14} height={14} />
                  <span>{student.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center  gap-2">
                  <Image src='/phone.png' alt='' width={14} height={14} />
                  <span>{student.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARD */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <Suspense fallback="loading...">
                <StudentAttendanceCard id={student.id}/>
              </Suspense>
            </div>
            {/* CARD */}
            {/* SEMESTER/YEAR INFO */}
          <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
            <Image 
              src="/singleClass.png" 
              alt="" 
              width={24} 
              height={24} 
              className="w-6 h-6" 
            />
            <div>
              <h1 className="text-xl font-semibold">Year {student.year.name}</h1>
              <span className="text-sm text-gray-400">Semester {student.semester.name}</span>
            </div>
          </div>
            {/* CARD */}
            {/* <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class._count.lessons}</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div> */}
            {/* CARD */}
            {/* <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div> */}
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          {/* <h1>Student&apos;s Schedule</h1>
          <BigCalendarContainer type="teacherId" id={student.id} /> */}
          <RoutineCard semester={student.semester.name} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-[#EDF9FD]" href={`/list/results?studentId=${student.id}`}>
              Student&apos;s Results
            </Link>
            <Link className="p-3 rounded-md bg-[#F1F0FF]" href={`/list/attendances?studentId=${student.id}`}>
              Attendance Records
            </Link>
            <Link className="p-3 rounded-md bg-[#FEFCE8]" href={`/list/assignments?studentId=${student.id}`}>
              Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  )
}
