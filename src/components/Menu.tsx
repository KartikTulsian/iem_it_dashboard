'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Semester, Year } from "@prisma/client";

type MenuProps = {
  years: Year[];
  semester: Semester[];
  role: string | null;
  studentSemesterId?: number;
};

export default function Menu({ years, semester, role, studentSemesterId }: MenuProps) {
  const [showStudentYears, setShowStudentYears] = useState(false);
  const [showSubjectSems, setShowSubjectSems] = useState(false);
  const [showStudentSubjectSems, setShowStudentSubjectSems] = useState(false);

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: "/home.png",
          label: "Home",
          href: `/${role}`,
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/teacher.png",
          label: "Teachers",
          href: "/list/teachers",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/student.png",
          label: "Students",
          dropdown: years.map((year) => ({
            label: year.name,
            href: `/list/students?yearId=${year.id}`,
          })),
          visible: ["admin", "teacher"],
          state: showStudentYears,
          toggle: () => setShowStudentYears((prev) => !prev),
        },
        {
          icon: "/subject.png",
          label: "Subjects",
          dropdown: [...semester]
            .sort((a, b) => a.id - b.id) // ✅ Sort by semester ID
            .map((semester) => ({
              label: "Semester " + semester.id,
              children: [
                {
                  label: "Theory",
                  href: `/list/subjects?semId=${semester.id}&type=theory`,
                },
                {
                  label: "Lab",
                  href: `/list/subjects?semId=${semester.id}&type=lab`,
                },
              ],
            })),
          visible: ["admin", "teacher"],
          state: showSubjectSems,
          toggle: () => setShowSubjectSems((prev) => !prev),
        },
        {
          icon: "/subject.png",
          label: "Semester Subjects",
          dropdown: (role === "student" && studentSemesterId)
            ? semester
                .filter((sem) => sem.id === studentSemesterId) // only current sem
                .map((semester) => ({
                  label: "Semester " + semester.id,
                  children: [
                    {
                      label: "Theory",
                      href: `/list/subjects?semId=${semester.id}&type=theory`,
                    },
                    {
                      label: "Lab",
                      href: `/list/subjects?semId=${semester.id}&type=lab`,
                    },
                  ],
                }))
            : [],
          visible: ["student"],
          state: showStudentSubjectSems,
          toggle: () => setShowStudentSubjectSems((prev) => !prev),
        },
        {
          icon: "/exam.png",
          label: "Exams",
          href: "/list/exams",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/assignment.png",
          label: "Assignments",
          href: "/list/assignments",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/result.png",
          label: "Results",
          href: "/list/results",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/calendar.png",
          label: "Events",
          href: "/list/events",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/announcement.png",
          label: "Announcements",
          href: "/list/announcements",
          visible: ["admin", "teacher", "student"],
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: "/profile.png",
          label: "Profile",
          href: "/profile",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/setting.png",
          label: "Settings",
          href: "/settings",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/logout.png",
          label: "Logout",
          href: "/logout",
          visible: ["admin", "teacher", "student"],
        },
      ],
    },
  ];

  if (!role) return null;

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>

          {section.items
            .filter((item) => item.visible.includes(role))
            .map((item) => (
              <div key={item.label} className="w-full">
                {!item.dropdown ? (
                  <Link
                    href={item.href}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-blue-100"
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                ) : (
                  <div className="w-full">
                    <div
                      onClick={item.toggle}
                      className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-blue-100 cursor-pointer"
                    >
                      <Image src={item.icon} alt="" width={20} height={20} />
                      <span className="hidden lg:block">{item.label}</span>
                    </div>

                    <div
                      className={`ml-8 transition-all duration-300 ease-in-out ${item.state ? "max-h-[300px] overflow-y-auto" : "max-h-0 overflow-hidden"
                        } scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
                    >
                      {(item.dropdown as any[]).length > 0 &&
                        "children" in item.dropdown[0] ? (
                        (item.dropdown as {
                          label: string;
                          children: { label: string; href: string }[];
                        }[]).map((sem) => (
                          <div key={sem.label} className="pl-2 mb-1">
                            <span className="text-gray-500 font-semibold block">
                              {sem.label}
                            </span>
                            <div className="ml-4 flex flex-col">
                              {sem.children.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="block px-2 py-1 text-sm text-gray-700 hover:bg-blue-100 rounded"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        (item.dropdown as { label: string; href: string }[]).map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-1 text-sm text-gray-700 hover:bg-blue-100 rounded"
                          >
                            {sub.label}
                          </Link>
                        ))
                      )}
                    </div>


                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
