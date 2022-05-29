import {
  PrismaClient,
  SemesterType,
  UserRole,
  Day,
  EndType,
} from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Faculties
  const facultyFI = await prisma.faculty.create({
    data: {
      name: 'Faculty of informatics',
    },
  });

  const facultyFL = await prisma.faculty.create({
    data: {
      name: 'Faculty of medicine',
    },
  });

  // Semesters
  const semesterS2021 = await prisma.semester.create({
    data: {
      year: 2021,
      semesterType: SemesterType.summer,
    },
  });

  const semesterW2021 = await prisma.semester.create({
    data: {
      year: 2021,
      semesterType: SemesterType.winter,
    },
  });

  const semesterS2022 = await prisma.semester.create({
    data: {
      year: 2022,
      semesterType: SemesterType.summer,
    },
  });

  const semesterW2022 = await prisma.semester.create({
    data: {
      year: 2022,
      semesterType: SemesterType.winter,
    },
  });

  // Marks
  const markA = await prisma.mark.create({
    data: {
      charRepresent: 'A',
      numericRepresent: 1.0,
    },
  });

  const markB = await prisma.mark.create({
    data: {
      charRepresent: 'B',
      numericRepresent: 1.5,
    },
  });

  const markC = await prisma.mark.create({
    data: {
      charRepresent: 'C',
      numericRepresent: 2.0,
    },
  });

  const markD = await prisma.mark.create({
    data: {
      charRepresent: 'D',
      numericRepresent: 2.5,
    },
  });

  const markE = await prisma.mark.create({
    data: {
      charRepresent: 'E',
      numericRepresent: 3.0,
    },
  });

  const markF = await prisma.mark.create({
    data: {
      charRepresent: 'F',
      numericRepresent: 4.0,
    },
  });

  // Users semesterS2022
  const userSpeed = await prisma.user.create({
    data: {
      firstName: 'Speed',
      lastName: 'Demon',
      email: 'speed.demon@gmail.com',
      passwdHash: await argon.hash('C#isSuperiorToJS'),
      roles: [UserRole.user],
      facultyId: facultyFI.id,
      semesterId: semesterS2022.id,
    },
  });

  const userJacky = await prisma.user.create({
    data: {
      firstName: 'Jacky',
      lastName: 'the Great',
      email: 'jacky.f1master@gmail.com',
      passwdHash: await argon.hash('ILoveHaas'),
      roles: [UserRole.user],
      facultyId: facultyFI.id,
      semesterId: semesterS2022.id,
    },
  });

  const userDipo = await prisma.user.create({
    data: {
      firstName: 'Dipo',
      lastName: 'the Java King',
      email: 'dipo.java@gmail.com',
      passwdHash: await argon.hash('IActuallyDontLikeJava'),
      roles: [UserRole.user],
      facultyId: facultyFI.id,
      semesterId: semesterS2022.id,
    },
  });

  const userPismenka = await prisma.user.create({
    data: {
      firstName: 'Pismenka',
      lastName: 'the Front-end Master',
      email: 'pismenka.css@gmail.com',
      passwdHash: await argon.hash('IAmTheCaptainNow'),
      roles: [UserRole.user],
      facultyId: facultyFI.id,
      semesterId: semesterS2022.id,
    },
  });

  // Admins
  const userAdmin = await prisma.user.create({
    data: {
      firstName: 'The',
      lastName: 'God',
      email: 'god@gmail.com',
      passwdHash: await argon.hash('password123'),
      roles: [UserRole.admin, UserRole.user],
      facultyId: facultyFI.id,
      semesterId: semesterS2022.id,
    },
  });

  // Teacher
  const teacherChashtag = await prisma.user.create({
    data: {
      firstName: 'C#',
      lastName: 'Teacher',
      email: 'c#@gmail.com',
      passwdHash: await argon.hash('linq'),
      roles: [UserRole.user, UserRole.teacher],
      facultyId: facultyFI.id,
      semesterId: semesterS2022.id,
    },
  });

  const teacherPhp = await prisma.user.create({
    data: {
      firstName: 'PHP',
      lastName: 'Enjoyer',
      email: 'phpGoesBrrr@gmail.com',
      passwdHash: await argon.hash('IAmOld'),
      roles: [UserRole.user, UserRole.teacher],
      facultyId: facultyFI.id,
      semesterId: semesterS2022.id,
    },
  });

  const teacherSenior = await prisma.user.create({
    data: {
      firstName: 'Senior',
      lastName: 'Teacher',
      email: 'senior@gmail.com',
      passwdHash: await argon.hash('expressPrismaReactRedux'),
      roles: [UserRole.user, UserRole.teacher],
      facultyId: facultyFI.id,
      semesterId: semesterS2022.id,
    },
  });

  const teacherJava = await prisma.user.create({
    data: {
      firstName: 'Java',
      lastName: 'Teacher',
      email: 'java@gmail.com',
      passwdHash: await argon.hash('ILoveJava'),
      roles: [UserRole.user, UserRole.teacher],
      facultyId: facultyFI.id,
      semesterId: semesterS2022.id,
    },
  });

  // Courses
  const coursePB138 = await prisma.course.create({
    data: {
      title: 'Actually not markup languages',
      code: 'PB138',
      description: 'Not a bad course so far',

      capacity: 150,
      credits: 69,
      endType: EndType.zk,
      room: 'D1',

      startSign: new Date(2022, 2, 18, 17, 0),
      endSign: new Date(2022, 7, 18, 17, 0),

      lectureDay: Day.monday,
      lectureStartTimeMin: 960,
      lectureDurationMin: 120,

      semesterId: semesterS2022.id,
      creatorId: teacherSenior.id,
      facultyId: facultyFI.id,
    },
  });

  const coursePV178 = await prisma.course.create({
    data: {
      title: 'C# Subject',
      code: 'PV178',
      description: 'Ou yeah baby',

      capacity: 175,
      credits: 42,
      endType: EndType.k,
      room: 'D3',

      startSign: new Date(2022, 2, 19, 9, 0),
      endSign: new Date(2022, 3, 19, 9, 0),

      lectureDay: Day.friday,
      lectureStartTimeMin: 720,
      lectureDurationMin: 120,

      semesterId: semesterS2022.id,
      creatorId: teacherChashtag.id,
      facultyId: facultyFI.id,
    },
  });

  const courseNoStudents = await prisma.course.create({
    data: {
      title: 'Java Subject',
      code: 'PB069',
      description: 'Pls come',

      capacity: 420,
      credits: 5,
      endType: EndType.zk,
      room: 'D1',

      startSign: new Date(2022, 3, 19, 9, 0),
      endSign: new Date(2022, 4, 25, 9, 0),

      lectureDay: Day.tuesday,
      lectureStartTimeMin: 720,
      lectureDurationMin: 120,

      semesterId: semesterS2022.id,
      creatorId: teacherChashtag.id,
      facultyId: facultyFI.id,
    },
  });

  // Old subject
  const courseOldPB138 = await prisma.course.create({
    data: {
      title: 'Old markup languages',
      code: 'PB138',
      description: 'Not a bad course so far',

      capacity: 150,
      credits: 69,
      endType: EndType.z,
      room: 'D1',

      startSign: new Date(2022, 2, 18, 17, 0),
      endSign: new Date(2022, 3, 18, 17, 0),

      lectureDay: Day.thursday,
      lectureStartTimeMin: 60,
      lectureDurationMin: 120,

      semesterId: semesterS2021.id,
      creatorId: teacherPhp.id,
      facultyId: facultyFI.id,
    },
  });

  // Seminar groups
  const pb138SemGroup1 = await prisma.seminarGroup.create({
    data: {
      seminarGroupDay: Day.monday,
      seminarGroupDurationStartTimeMins: 300,
      seminarGroupDurationMins: 120,
      room: 'A217',
      capacity: 20,

      courseId: coursePB138.id,
    },
  });

  const pb138SemGroup2 = await prisma.seminarGroup.create({
    data: {
      seminarGroupDay: Day.tuesday,
      seminarGroupDurationStartTimeMins: 360,
      seminarGroupDurationMins: 120,
      room: 'A320',
      capacity: 15,

      courseId: coursePB138.id,
    },
  });

  const pv178SemGroup1 = await prisma.seminarGroup.create({
    data: {
      seminarGroupDay: Day.tuesday,
      seminarGroupDurationStartTimeMins: 1080,
      seminarGroupDurationMins: 180,
      room: 'A310',
      capacity: 15,

      courseId: coursePV178.id,
    },
  });

  const pv178SemGroup2 = await prisma.seminarGroup.create({
    data: {
      seminarGroupDay: Day.monday,
      seminarGroupDurationStartTimeMins: 360,
      seminarGroupDurationMins: 180,
      room: 'A210',
      capacity: 20,

      courseId: coursePV178.id,
    },
  });

  const pv178SemGroup3 = await prisma.seminarGroup.create({
    data: {
      seminarGroupDay: Day.wednesday,
      seminarGroupDurationStartTimeMins: 480,
      seminarGroupDurationMins: 180,
      room: 'A210',
      capacity: 15,

      courseId: coursePV178.id,
    },
  });

  // Old seminar groups
  const pb138OldSeminarGroup1 = await prisma.seminarGroup.create({
    data: {
      seminarGroupDay: Day.wednesday,
      seminarGroupDurationStartTimeMins: 840,
      seminarGroupDurationMins: 180,
      room: 'A290',
      capacity: 15,

      courseId: courseOldPB138.id,
    },
  });

  const pb138OldSeminarGroup2 = await prisma.seminarGroup.create({
    data: {
      seminarGroupDay: Day.friday,
      seminarGroupDurationStartTimeMins: 600,
      seminarGroupDurationMins: 180,
      room: 'A410',
      capacity: 15,

      courseId: courseOldPB138.id,
    },
  });

  // Connection tables
  // -----------------

  // New PB138

  // TeacherToCourse new PB138
  const teacherToPB138Course1 = await prisma.userCourseTeaches.create({
    data: {
      teacherId: teacherSenior.id,
      courseId: coursePB138.id,

      isHelper: false,
      isLecturer: true,
    },
  });

  const teacherToPB138Course2 = await prisma.userCourseTeaches.create({
    data: {
      teacherId: teacherPhp.id,
      courseId: coursePB138.id,

      isHelper: true,
      isLecturer: false,
    },
  });

  // TutorToSemGroup new PB138
  const tutorToPB138SemGroup1 = await prisma.userSeminarGroupTeaches.create({
    data: {
      tutorId: teacherPhp.id,
      seminarGroupId: pb138SemGroup1.id,
    },
  });

  const tutorToPB138SemGroup2 = await prisma.userSeminarGroupTeaches.create({
    data: {
      tutorId: teacherJava.id,
      seminarGroupId: pb138SemGroup2.id,
    },
  });

  const tutorToPB138SemGroup3 = await prisma.userSeminarGroupTeaches.create({
    data: {
      tutorId: teacherSenior.id,
      seminarGroupId: pb138SemGroup2.id,
    },
  });

  // StudentToCourse new PB138
  const studentToPB138Course1 = await prisma.userCourseSigned.create({
    data: {
      studentId: userSpeed.id,
      courseId: coursePB138.id,
    },
  });

  const studentToPB138Course2 = await prisma.userCourseSigned.create({
    data: {
      studentId: userJacky.id,
      courseId: coursePB138.id,

      isFavourite: true,
    },
  });

  const studentToPB138Course3 = await prisma.userCourseSigned.create({
    data: {
      studentId: userDipo.id,
      courseId: coursePB138.id,
    },
  });

  // StudentToSeminarGroup new PB138
  const studentToPB138SemGroup1 = await prisma.userSeminarGroupSigned.create({
    data: {
      studentId: userSpeed.id,
      seminarGroupId: pb138SemGroup1.id,
      courseId: coursePB138.id,
    },
  });

  const studentToPB138SemGroup2 = await prisma.userSeminarGroupSigned.create({
    data: {
      studentId: userJacky.id,
      seminarGroupId: pb138SemGroup1.id,
      courseId: coursePB138.id,
    },
  });

  const studentToPB138SemGroup3 = await prisma.userSeminarGroupSigned.create({
    data: {
      studentId: userDipo.id,
      seminarGroupId: pb138SemGroup2.id,
      courseId: coursePB138.id,
    },
  });

  // New PV178

  // TeacherToCourse PV178
  const teacherToPV178Course1 = await prisma.userCourseTeaches.create({
    data: {
      teacherId: teacherChashtag.id,
      courseId: coursePV178.id,

      isHelper: false,
      isLecturer: true,
    },
  });

  const teacherToPV178Course2 = await prisma.userCourseTeaches.create({
    data: {
      teacherId: teacherJava.id,
      courseId: coursePV178.id,

      isHelper: true,
      isLecturer: true,
    },
  });

  // TutorToSemGroup PV178
  const tutorToPV178SemGroup1 = await prisma.userSeminarGroupTeaches.create({
    data: {
      tutorId: teacherChashtag.id,
      seminarGroupId: pv178SemGroup1.id,
    },
  });

  const tutorToPV178SemGroup3 = await prisma.userSeminarGroupTeaches.create({
    data: {
      tutorId: teacherJava.id,
      seminarGroupId: pv178SemGroup2.id,
    },
  });

  const tutorToPV178SemGroup4 = await prisma.userSeminarGroupTeaches.create({
    data: {
      tutorId: teacherChashtag.id,
      seminarGroupId: pv178SemGroup2.id,
    },
  });

  const tutorToPV178SemGroup5 = await prisma.userSeminarGroupTeaches.create({
    data: {
      tutorId: teacherChashtag.id,
      seminarGroupId: pv178SemGroup3.id,
    },
  });

  // StudentToCourse PV178
  const studentToPV178Course1 = await prisma.userCourseSigned.create({
    data: {
      studentId: userSpeed.id,
      courseId: coursePV178.id,
    },
  });

  const studentToPV178Course2 = await prisma.userCourseSigned.create({
    data: {
      studentId: userJacky.id,
      courseId: coursePV178.id,
    },
  });

  const studentToPV178Course3 = await prisma.userCourseSigned.create({
    data: {
      studentId: userDipo.id,
      courseId: coursePV178.id,
    },
  });

  const studentToPV178Course4 = await prisma.userCourseSigned.create({
    data: {
      studentId: userPismenka.id,
      courseId: coursePV178.id,
    },
  });

  // StudentToSemGroup PV178
  const studentToPV178SemGroup1 = await prisma.userSeminarGroupSigned.create({
    data: {
      studentId: userSpeed.id,
      seminarGroupId: pv178SemGroup1.id,
      courseId: coursePV178.id,
    },
  });

  const studentToPV178SemGroup2 = await prisma.userSeminarGroupSigned.create({
    data: {
      studentId: userJacky.id,
      seminarGroupId: pv178SemGroup1.id,
      courseId: coursePV178.id,
    },
  });

  const studentToPV178SemGroup3 = await prisma.userSeminarGroupSigned.create({
    data: {
      studentId: userDipo.id,
      seminarGroupId: pv178SemGroup2.id,
      courseId: coursePV178.id,
    },
  });

  const studentToPV178SemGroup4 = await prisma.userSeminarGroupSigned.create({
    data: {
      studentId: userPismenka.id,
      seminarGroupId: pv178SemGroup3.id,
      courseId: coursePV178.id,
    },
  });

  // Old PB138

  // TeacherToCourse Old PB138
  const teacherToOldPB138Course1 = await prisma.userCourseTeaches.create({
    data: {
      teacherId: teacherPhp.id,
      courseId: courseOldPB138.id,

      isHelper: false,
      isLecturer: true,
    },
  });

  // TutorToSemGroup Old PB138
  const tutorToOldOB138SemGroup1 = await prisma.userSeminarGroupTeaches.create({
    data: {
      tutorId: teacherPhp.id,
      seminarGroupId: pb138OldSeminarGroup1.id,
    },
  });

  const tutorToOldOB138SemGroup2 = await prisma.userSeminarGroupTeaches.create({
    data: {
      tutorId: teacherPhp.id,
      seminarGroupId: pb138OldSeminarGroup2.id,
    },
  });

  // StudentToCourse Old PB138
  const studentToOldPB138Course1 = await prisma.userCourseSigned.create({
    data: {
      studentId: userPismenka.id,
      courseId: courseOldPB138.id,
    },
  });

  const pismenkaEval = await prisma.evaluation.create({
    data: {
      teacherSubmittedId: teacherPhp.id,
      markId: markF.id,

      userId: studentToOldPB138Course1.studentId,
      courseId: studentToOldPB138Course1.courseId,
    },
  });

  const studentToOldPB138Course2 = await prisma.userCourseSigned.create({
    data: {
      studentId: userSpeed.id,
      courseId: courseOldPB138.id,
    },
  });

  const speedEval = await prisma.evaluation.create({
    data: {
      teacherSubmittedId: teacherPhp.id,
      markId: markF.id,

      userId: studentToOldPB138Course2.studentId,
      courseId: studentToOldPB138Course2.courseId,
    },
  });

  // StudentToCourse Old PB138
  const studentToOldPB138SemGroup1 = await prisma.userSeminarGroupSigned.create(
    {
      data: {
        studentId: userPismenka.id,
        seminarGroupId: pb138OldSeminarGroup1.id,
        courseId: courseOldPB138.id,
      },
    },
  );

  const studentToOldPB138SemGroup2 = await prisma.userSeminarGroupSigned.create(
    {
      data: {
        studentId: userSpeed.id,
        seminarGroupId: pb138OldSeminarGroup2.id,
        courseId: courseOldPB138.id,
      },
    },
  );

  // Empty subject

  // TeacherToCourse EmptyCourse
  const teacherToEmptyGourse1 = await prisma.userCourseTeaches.create({
    data: {
      teacherId: teacherJava.id,
      courseId: courseNoStudents.id,
      isHelper: false,
      isLecturer: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
