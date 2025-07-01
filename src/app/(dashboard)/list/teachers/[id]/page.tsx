import Announcements from '@/components/Announcements'
import FormContainer from '@/components/FormContainer'
import Performance from '@/components/Performance'
import YearWiseMenteesCard from '@/components/YearWiseMenteesCard'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Teacher } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function SingleTeacherPage(props: { params: { id: string } }) {

  const { id } = await props.params;
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const teacher: (Teacher & {
    _count: {
      subjects: number;
      mentees: number;
      classTeacherOf: number;
    };
    mentees: {
      id: string;
      name: string;
      surname: string;
      year: {
        name: string;
      };
    }[];
    classTeacherOf: {
      id: number;
      name: string;
    }[];
  }) | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          mentees: true,
          classTeacherOf: true,
        },
      },
      mentees: {
        select: {
          id: true,
          name: true,
          surname: true,
          year: {
            select: {
              name: true, // fetch year name like "1st Year"
            }
          }
        },
      },
      classTeacherOf: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });



  if(!teacher) {
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
                        src={teacher.img || "/noAvatar.png"}
                        alt='' 
                        width={144} 
                        height={144} 
                        className='w-36 h-36 rounded-full object-cover'
                    />
                </div>
                <div className="w-2/3 flex flex-col justify-between gap-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl font-semibold">{teacher.name + " " + teacher.surname}</h1>
                      {role === "admin" && (
                        <div className="bg-[#8286ff] px-1 py-1 rounded-full text-sm font-medium">
                          <FormContainer
                            table="teacher"
                            type="update"
                            data={teacher}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                        <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center  gap-2">
                            <Image src='/blood.png' alt='' width={14} height={14}/>
                            <span>{teacher.bloodType}</span>
                        </div>
                        <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center  gap-2">
                            <Image src='/date.png' alt='' width={14} height={14}/>
                            <span>{new Intl.DateTimeFormat("en-GB").format(teacher.birthday)}</span>
                        </div>
                        <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center  gap-2">
                            <Image src='/mail.png' alt='' width={14} height={14}/>
                            <span>{teacher.email || "-"}</span>
                        </div>
                        <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center  gap-2">
                            <Image src='/phone.png' alt='' width={14} height={14}/>
                            <span>{teacher.phone || "-"}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* SMALL CARD */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
                {/* CARD */}
                <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                    <Image src='/singleAttendance.png' alt='' width={24} height={24} className='w-6 h-6'/>
                    <div className="">
                        <h1 className='text-xl font-semibold'>90%</h1>
                        <span className='text-sm text-gray-400'>Attendance</span>
                    </div>
                </div>
                {/* CARD */}
                <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                  <Image src='/singleClass.png' alt='' width={24} height={24} className='w-6 h-6'/>
                  <div>
                    <h1 className='text-xl font-semibold'>
                      {teacher?.classTeacherOf[0]?.name ?? "-"}
                    </h1>
                    <span className='text-sm text-gray-400'>Class Teacher</span>
                  </div>
                </div>

                {/* CARD */}
                <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                  <Image src='/singleSubject.png' alt='' width={30} height={30} className='w-8 h-8'/>
                  <div>
                    <h1 className='text-xl font-semibold'>{teacher._count.subjects}</h1>
                    <span className='text-sm text-gray-400'>Subjects</span>
                  </div>
                </div>
                {/* CARD */}
                {/* <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                    <Image src='/singleClass.png' alt='' width={24} height={24} className='w-6 h-6'/>
                    <div className="">
                        <h1 className='text-xl font-semibold'>6</h1>
                        <span className='text-sm text-gray-400'>Classes</span>
                    </div>
                </div> */}
                <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                  <Image src='/singleStudent.png' alt='' width={30} height={30} className='w-8 h-8'/>
                  <div>
                    <h1 className='text-xl font-semibold'>{teacher._count.mentees}</h1>
                    <span className='text-sm text-gray-400'>Mentees</span>
                  </div>
                </div>

            </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          {/* <h1>Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type="teacherId" id={teacher.id} /> */}
          {/* Mentees Summary */}
          <YearWiseMenteesCard teacher={teacher}/>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-[#FDF2F8]" href={`/list/events?teacherId=${teacher.id}`}>
              Events
            </Link>
            <Link className="p-3 rounded-md bg-[#EFFAF0]" href={`/list/announcements?teacherId=${teacher.id}`}>
              Announcements
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  )
}
