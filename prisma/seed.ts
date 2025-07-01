import { PrismaClient, ComponentType, UserSex, Teacher } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // ADMIN
  await prisma.admin.createMany({
    data: [
      { id: "admin1", username: "admin1" },
      { id: "admin2", username: "admin2" },
    ],
  });

  // Create Teachers
  const teachers: Teacher[] =  [];
  for (let i = 1; i <= 10; i++) {
    const teacher = await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TeacherName${i}`,
        surname: `TeacherSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `90000000${i}`,
        address: `Street ${i}, City`,
        img: '/noAvatar.png',
        bloodType: 'A+',
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        birthday: new Date(`198${i % 10}-01-01`),
      },
    });
    teachers.push(teacher);
  }

  // Create Years
  const yearNames = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const years = await Promise.all(
    yearNames.map((name, index) =>
      prisma.year.create({
        data: {
          name,
          classTeacher: index === 0
            ? undefined // no class teacher for 1st Year
            : { connect: { id: teachers[index % teachers.length].id } },
        },
      })
    )
  );


  // Create Semesters
  const semesterNames = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];
  const semesters = await Promise.all(
    semesterNames.map((name) =>
      prisma.semester.create({
        data: { name },
      })
    )
  );

  // Create Subjects and Components per Semester
  const subjects = [];

  // Now use the sorted semesters
  for (let semesterIndex = 0; semesterIndex < semesters.length; semesterIndex++) {
    const semester = semesters[semesterIndex];
    const semesterNumber = semesterIndex + 1;

    for (let i = 1; i <= 10; i++) {
      const subject = await prisma.subject.create({
        data: {
          name: `Subject ${i} of Semester ${semester.id}`,
          code: `SUB${semester.id}${i}`,
          semester: { connect: { id: semester.id } },
        },
      });

      // Randomly decide components for this subject
      // 0 = THEORY only, 1 = LAB only, 2 = Both
      const componentChoice = Math.floor(Math.random() * 3);

      const componentData = [];

      if (componentChoice === 0) {
        componentData.push({ type: ComponentType.THEORY, subjectId: subject.id });
      } else if (componentChoice === 1) {
        componentData.push({ type: ComponentType.LAB, subjectId: subject.id });
      } else {
        componentData.push(
          { type: ComponentType.THEORY, subjectId: subject.id },
          { type: ComponentType.LAB, subjectId: subject.id }
        );
      }

      await prisma.subjectComponent.createMany({
        data: componentData,
      });

      subjects.push(subject);
    }
  }


  // Assign teachers to subjects (round-robin)
  for (let i = 0; i < subjects.length; i++) {
    await prisma.subject.update({
      where: { id: subjects[i].id },
      data: {
        teachers: {
          connect: { id: teachers[i % teachers.length].id },
        },
      },
    });
  }

  // Create Students with Year and Semester
  const students = [];
  for (let i = 1; i <= 50; i++) {
    const year = years[i % years.length];
    const semester = semesters[i % semesters.length];
    const mentor = teachers[Math.floor(Math.random() * teachers.length)];

    const student = await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `StudentName${i}`,
        surname: `StudentSurname${i}`,
        email: `student${i}@example.com`,
        phone: `88888888${i}`,
        address: `Hostel Block ${i}`,
        img: '/noAvatar.png',
        bloodType: 'B+',
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        birthday: new Date(`200${i % 10}-06-15`),
        year: { connect: { id: year.id } },
        semester: { connect: { id: semester.id } },
        mentor: { connect: { id: mentor.id } },
      },
    });
    students.push(student);
  }


  // Create Exams and Assignments for each SubjectComponent
  const components = await prisma.subjectComponent.findMany();

  // Create Exams and Assignments for 25% of components
  const sampleSize = Math.floor(components.length * 0.25);
  const selectedComponents = components.sort(() => 0.5 - Math.random()).slice(0, sampleSize);

  for (const component of selectedComponents) {
    await prisma.exam.create({
      data: {
        title: `Exam - ${component.type}`,
        startTime: new Date(),
        endTime: new Date(Date.now() + 60 * 60 * 1000), // 1hour later
        subjectComponent: { connect: { id: component.id } },
      },
    });

    await prisma.assignment.create({
      data: {
        title: `Assignment - ${component.type}`,
        startDate: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // due in 7 days
        subjectComponent: { connect: { id: component.id } },
      },
    });

  // Add StudyMaterial
    await prisma.studyMaterial.create({
      data: {
        title: `Study Material - ${component.type}`,
        description: `Description for ${component.type} material`,
        url: `https://example.com/material/${component.id}`,
        subjectComponent: { connect: { id: component.id } },
      },
    });
  }

  // Create Results for each student per semester
  for (const student of students) {
    await prisma.result.create({
      data: {
        gpa: parseFloat((Math.random() * 4).toFixed(2)),
        remarks: 'Good performance',
        url: Math.random() > 0.5 ? 'https://example.com/results/sample.pdf' : null,
        student: { connect: { id: student.id } },
        semester: { connect: { id: student.semesterId } },
      },
    });
  }


  // Create Announcements and Events
  for (const year of years) {
    await prisma.announcement.create({
      data: {
        title: `Yearly Announcement for ${year.name}`,
        description: 'Important information for the year.',
        date: new Date(),
        year: { connect: { id: year.id } },
      },
    });

    await prisma.event.create({
      data: {
        title: `Yearly Event for ${year.name}`,
        description: 'Annual gathering and activities.',
        startTime: new Date(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        year: { connect: { id: year.id } },
      },
    });
  }

  for (const semester of semesters) {
    await prisma.announcement.create({
      data: {
        title: `Semester Announcement for ${semester.name}`,
        description: 'Important information for the semester.',
        date: new Date(),
        semester: { connect: { id: semester.id } },
      },
    });

    await prisma.event.create({
      data: {
        title: `Semester Event for ${semester.name}`,
        description: 'Semester-based activities and workshops.',
        startTime: new Date(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        semester: { connect: { id: semester.id } },
      },
    });
  }

  // Create Notifications
  for (const student of students.slice(0, 10)) {
    await prisma.notification.create({
      data: {
        message: 'New assignment available.',
        studentId: student.id,
        // student: { connect: { id: student.id } }
      },
    });
  }

  for (const teacher of teachers.slice(0, 5)) {
    await prisma.notification.create({
      data: {
        message: 'Staff meeting scheduled.',
        teacherId: teacher.id,
        // teacher: { connect: { id: teacher.id } }
      },
    });
  }

  // Create Attendance records
  for (const student of students) {
    for (const subject of subjects.slice(0, 3)) {
      await prisma.attendance.create({
        data: {
          date: new Date(),
          present: Math.random() > 0.2,
          student: { connect: { id: student.id } },
          subject: { connect: { id: subject.id } },
        },
      });
    }
  }

  console.log('✅ Seeding completed.');
}

// main()
//   .catch((e) => {
//     console.error('❌ Error while seeding:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e); // Already done, but ensure you see full error
    console.error(e.stack);
    await prisma.$disconnect();
    process.exit(1);
  });