"use server"

import { revalidatePath } from "next/cache";
import {
  AnnouncementSchema,
  AssignmentSchema,
  ClassSchema,
  EventSchema,
  ExamSchema,
  ResultSchema,
  StudentSchema,
  StudyMaterialSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    // if (!data.type) {
    //   throw new Error("Component type is required when creating a subject.");
    // }
    await prisma.subject.create({
      data: {
        name: data.name,
        code: data.code,
        semester: { connect: { id: data.semesterId } },
        teachers: {
          connect: data.teachers.map((id) => ({ id })),
        },
        components: {
          create: {
            type: data.type,
          },
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    // Update main subject fields
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        code: data.code,
        semester: { connect: { id: data.semesterId } },
        teachers: {
          set: data.teachers.map((id) => ({ id })),
        },
      },
    });

    // Update or create SubjectComponent only if type is provided
    // if (data.type) {
    //   const existingComponent = await prisma.subjectComponent.findFirst({
    //     where: { subjectId: data.id },
    //   });

    //   if (existingComponent) {
    //     await prisma.subjectComponent.update({
    //       where: { id: existingComponent.id },
    //       data: { type: data.type },
    //     });
    //   } else {
    //     await prisma.subjectComponent.create({
    //       data: {
    //         type: data.type,
    //         subject: { connect: { id: data.id } },
    //       },
    //     });
    //   }
    // }

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// export const createClass = async (
//   currentState: CurrentState,
//   data: ClassSchema
// ) => {
//   try {
//     await prisma.class.create({
//       data
//     });

//     // revalidatePath("/list/class");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// }

// export const updateClass = async (
//   currentState: CurrentState,
//   data: ClassSchema
// ) => {
//   try {
//     await prisma.class.update({
//       where: {
//         id: data.id,
//       },
//       data
//     });

//     // revalidatePath("/list/class");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const deleteClass = async (
//   currentState: CurrentState,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;
//   try {
//     await prisma.class.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//     // revalidatePath("/list/class");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    const clerk = await clerkClient();

    const user = await clerk.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Clerk error details:", JSON.stringify(err, null, 2));
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    const clerk = await clerkClient();

    if(!data.id){
      return {
        success: false,
        error: true,
      }
    }
    const user = await clerk.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.update({
      where: {
        id: data.id
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        // img: data.img || null,
        ...(data.img !== "" && { img: data.img }),
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Clerk error details:", JSON.stringify(err, null, 2));
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const clerk = await clerkClient();

    await clerk.users.deleteUser(id);

    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  try {
    const clerk = await clerkClient();

    const user = await clerk.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        yearId: data.yearId,
        semesterId: data.semesterId,
        mentorId: data.mentorId || null,
      },
    });

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Clerk error details:", JSON.stringify(err, null, 2));
    return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  try {
    const clerk = await clerkClient();

    if (!data.id) {
      return {
        success: false,
        error: true,
      };
    }

    const user = await clerk.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });

    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        ...(data.img !== "" && { img: data.img }),
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        yearId: data.yearId,
        semesterId: data.semesterId,
        mentorId: data.mentorId || null,
      },
    });

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Clerk error details:", JSON.stringify(err, null, 2));
    return { success: false, error: true };
  }
};


export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const clerk = await clerkClient();

    await clerk.users.deleteUser(id);

    await prisma.student.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  try {
    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectComponentId: data.subjectComponentId,
      },
    });

    // revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  try {
    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectComponentId: data.subjectComponentId,
      },
    });

    // revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });


    // revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {
  try {
    await prisma.assignment.create({
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        subjectComponentId: data.subjectComponentId,
      },
    });

    // revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}

export const updateAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {
  try {
    await prisma.assignment.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        subjectComponentId: data.subjectComponentId,
      },
    });

    // revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAssignment = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.assignment.delete({
      where: {
        id: parseInt(id),
        // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });


    // revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  try {
    await prisma.event.create({
      data: {
        title: data.title,
        ...(data.img !== "" && { img: data.img }),
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        yearId: data.yearId ?? null,
        semesterId: data.semesterId ?? null,
      },
    });

    // revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}

export const updateEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  try {
    await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        ...(data.img !== "" && { img: data.img }),
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        yearId: data.yearId ?? null,
        semesterId: data.semesterId ?? null,
      },
    });

    // revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteEvent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.event.delete({
      where: {
        id: parseInt(id),
        // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });


    // revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {
  try {
    await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        yearId: data.yearId ?? null,
        semesterId: data.semesterId ?? null,
      },
    });

    // revalidatePath("/list/announcement");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}

export const updateAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {
  try {
    await prisma.announcement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        yearId: data.yearId ?? null,
        semesterId: data.semesterId ?? null,
      },
    });

    // revalidatePath("/list/announcement");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAnnouncement = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.event.delete({
      where: {
        id: parseInt(id),
        // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });


    // revalidatePath("/list/announcement");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createStudyMaterial = async (
  currentState: CurrentState,
  data: StudyMaterialSchema
) => {
  try {
    await prisma.studyMaterial.create({
      data: {
        title: data.title,
        description: data.description || null,
        url: data.url || null,
        subjectComponentId: data.subjectComponentId,
      },
    });

    // Optionally: revalidatePath("/subject/[id]") or wherever it's listed
    return { success: true, error: false };
  } catch (err) {
    console.error("Create Study Material Error:", err);
    return { success: false, error: true };
  }
};

export const updateStudyMaterial = async (
  currentState: CurrentState,
  data: StudyMaterialSchema
) => {
  try {
    await prisma.studyMaterial.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description || null,
        url: data.url || null,
        subjectComponentId: data.subjectComponentId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Update Study Material Error:", err);
    return { success: false, error: true };
  }
};

export const deleteStudyMaterial = async (
  currentState: CurrentState,
  formData: FormData
) => {
  const id = formData.get("id") as string;
  try {
    await prisma.studyMaterial.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Delete Study Material Error:", err);
    return { success: false, error: true };
  }
};

export const createResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {
  try {
    await prisma.result.create({
      data: {
        gpa: data.gpa,
        remarks: data.remarks || null,
        url: data.url || null,
        studentId: data.studentId,
        semesterId: data.semesterId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.error("Create Result Error:", err);
    return { success: false, error: true };
  }
};

export const updateResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {
  if (!data.id) {
    return { success: false, error: true, message: "Result ID is required for update" };
  }

  try {
    await prisma.result.update({
      where: { id: data.id },
      data: {
        gpa: data.gpa,
        remarks: data.remarks || null,
        url: data.url || null,
        studentId: data.studentId,
        semesterId: data.semesterId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.error("Update Result Error:", err);
    return { success: false, error: true };
  }
};

export const deleteResult = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id");
  if (!id || typeof id !== "string") {
    return { success: false, error: true, message: "Invalid ID" };
  }

  try {
    await prisma.result.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.error("Delete Result Error:", err);
    return { success: false, error: true };
  }
};