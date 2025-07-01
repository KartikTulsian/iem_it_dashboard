import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  code: z.string().min(1, { message: "Subject code is required!" }),
  teachers: z.array(z.string()).min(1, { message: "At least one teacher must be selected!" }), // teacher IDs
  semesterId: z.coerce.number().min(1, { message: "Semester is required!" }),
  type: z.enum(["THEORY", "LAB"], { message: "Subject type is required!" }), // moved to SubjectComponent
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects: z.array(z.string()).optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  yearId: z.coerce.number().min(1, { message: "Year is required!" }),
  semesterId: z.coerce.number().min(1, { message: "Semester is required!" }),
  mentorId: z.string().optional().or(z.literal("")),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  subjectComponentId: z.coerce.number({ message: "Component is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startDate: z.coerce.date({ message: "Start Date is required!" }),
  dueDate: z.coerce.date({ message: "Due Date is required!" }),
  subjectComponentId: z.coerce.number({ message: "Component is required!" }),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  img: z.string().optional(),
  description: z.string().min(1, { message: "Description is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  yearId: z.coerce.number().optional().nullable(),
  semesterId: z.coerce.number().optional().nullable(),
});

export type EventSchema = z.infer<typeof eventSchema>;

export const announcementSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  date: z.coerce.date({ message: "Date is required!" }),
  yearId: z.coerce.number().optional().nullable(),
  semesterId: z.coerce.number().optional().nullable(),
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;

export const studyMaterialSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  url: z.string().url({ message: "Must be a valid URL" }).optional(),
  subjectComponentId: z.coerce.number({ message: "Component ID is required" }),
});

export type StudyMaterialSchema = z.infer<typeof studyMaterialSchema>;

export const resultSchema = z.object({
  id: z.coerce.number().optional(), // id is number and optional for create
  gpa: z.coerce.number().min(0).max(10, { message: "SGPA must be between 0 and 10" }),
  remarks: z.string().optional(),
  url: z.string().url().optional(), // optional URL string (you can remove .url() if any string allowed)
  studentId: z.string().min(1, { message: "Student ID is required" }),
  semesterId: z.coerce.number({ invalid_type_error: "Semester ID must be a number" }),
});

export type ResultSchema = z.infer<typeof resultSchema>;