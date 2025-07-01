// app/components/MenuWrapper.tsx
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Semester, Year } from "@prisma/client";
import Menu from "./Menu"; // This is the client component

export default async function MenuWrapper() {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string | null;

  const years: Year[] = await prisma.year.findMany({
    orderBy: { name: "asc" },
  });

  const semester: Semester[] = await prisma.semester.findMany({
    orderBy: { name: "asc" },
  });

  let studentSemesterId: number | undefined = undefined;

  // ✅ If user is a student, fetch their semesterId from the Student table
  if (role === "student" && user?.id) {
    const student = await prisma.student.findUnique({
      where: { id: user.id }, // user.id must match your Student.id
      select: { semesterId: true },
    });

    if (student) {
      studentSemesterId = student.semesterId;
    }
  }

  return (
    <Menu
      years={years}
      semester={semester}
      role={role}
      studentSemesterId={studentSemesterId}
    />
  );
}
