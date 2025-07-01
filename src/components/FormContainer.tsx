import React from 'react'
import FormModal from './FormModal';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export type FormContainerProps = {
  table:
  | "teacher"
  | "student"
  | "subject"
  | "studyMaterial"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}

export default async function FormContainer({ table, type, data, id }: FormContainerProps) {

  let relatedData = {}

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      // case "class":
      //     const classGrades = await prisma.grade.findMany({
      //         select: { id: true, level: true },
      //     });
      //     const classTeachers = await prisma.teacher.findMany({
      //         select: { id: true, name: true, surname: true },
      //     });
      //     relatedData = {teachers: classTeachers, grades: classGrades};
      //     break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
      case "student":
        const studentYear = await prisma.year.findMany({
          select: { id: true, name: true },
        });
        const studentSemester = await prisma.semester.findMany({
          select: { id: true, name: true },
        });
        relatedData = { years: studentYear, semesters: studentSemester };
        break;
      case "exam":
        const examSubjectComponents = await prisma.subjectComponent.findMany({
          where: {
            ...(role === "teacher" && currentUserId ? {
              subject: {
                teachers: {
                  some: {
                    id: currentUserId,
                  },
                },
              },
            } : {}),
            ...(role === "student" && currentUserId ? {
              subject: {
                semester: {
                  students: {
                    some: {
                      id: currentUserId,
                    },
                  },
                },
              },
            } : {}),
          },
          select: {
            id: true,
            type: true,
            subject: {
              select: {
                id: true,
                name: true,
                code: true,
                semesterId: true,
              },
            },
          },
        });

        relatedData = { examSubjectComponents: examSubjectComponents };
        break;

      case "assignment":
        const assignmentSubjectComponents = await prisma.subjectComponent.findMany({
          where: {
            ...(role === "teacher" && currentUserId ? {
              subject: {
                teachers: {
                  some: {
                    id: currentUserId,
                  },
                },
              },
            } : {}),
            ...(role === "student" && currentUserId ? {
              subject: {
                semester: {
                  students: {
                    some: {
                      id: currentUserId,
                    },
                  },
                },
              },
            } : {}),
          },
          select: {
            id: true,
            type: true,
            subject: {
              select: {
                id: true,
                name: true,
                code: true,
                semesterId: true,
              },
            },
          },
        });

        relatedData = { assignmentSubjectComponents: assignmentSubjectComponents };
        break;
      case "event":
        const eventYears = await prisma.year.findMany({
          select: { id: true, name: true },
        });
        const eventSemesters = await prisma.semester.findMany({
          select: { id: true, name: true },
        });
        relatedData = { years: eventYears, semesters: eventSemesters };
        break;
      case "announcement":
        const announcementYears = await prisma.year.findMany({
          select: { id: true, name: true },
        });
        const announcementSemesters = await prisma.semester.findMany({
          select: { id: true, name: true },
        });
        relatedData = { years: announcementYears, semesters: announcementSemesters };
        break;
      case "studyMaterial":
        const subjectComponents = await prisma.subjectComponent.findMany({
          select: { id: true, type: true, subject: true },
        });
        relatedData = { subjectComponents: subjectComponents };
        break;
      case "result":
        const resultStudents = await prisma.student.findMany({
          select: {
            id: true,
            name: true,
            surname: true,
          },
        });
        const resultSemesters = await prisma.semester.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = {
          students: resultStudents,
          semesters: resultSemesters,
        };
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <FormModal table={table} type={type} data={data} id={id} relatedData={relatedData} />
    </div>
  )
}
