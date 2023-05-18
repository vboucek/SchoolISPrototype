/*
  Warnings:

  - The primary key for the `UserCourseSigned` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserCourseTeaches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserSeminarGroupSigned` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserSeminarGroupTeaches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[studentId,courseId]` on the table `UserCourseSigned` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId,courseId]` on the table `UserCourseTeaches` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tutorId,seminarGroupId]` on the table `UserSeminarGroupTeaches` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_userId_courseId_fkey";

-- DropForeignKey
ALTER TABLE "SeminarGroup" DROP CONSTRAINT "SeminarGroup_courseId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourseSigned" DROP CONSTRAINT "UserCourseSigned_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourseSigned" DROP CONSTRAINT "UserCourseSigned_studentId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourseTeaches" DROP CONSTRAINT "UserCourseTeaches_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourseTeaches" DROP CONSTRAINT "UserCourseTeaches_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeminarGroupSigned" DROP CONSTRAINT "UserSeminarGroupSigned_seminarGroupId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeminarGroupSigned" DROP CONSTRAINT "UserSeminarGroupSigned_studentId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeminarGroupTeaches" DROP CONSTRAINT "UserSeminarGroupTeaches_seminarGroupId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeminarGroupTeaches" DROP CONSTRAINT "UserSeminarGroupTeaches_tutorId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "semesterId" DROP NOT NULL,
ALTER COLUMN "creatorId" DROP NOT NULL,
ALTER COLUMN "facultyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Evaluation" ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SeminarGroup" ALTER COLUMN "courseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "facultyId" DROP NOT NULL,
ALTER COLUMN "semesterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserCourseSigned" DROP CONSTRAINT "UserCourseSigned_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "studentId" DROP NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL,
ADD CONSTRAINT "UserCourseSigned_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserCourseTeaches" DROP CONSTRAINT "UserCourseTeaches_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "teacherId" DROP NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL,
ADD CONSTRAINT "UserCourseTeaches_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserSeminarGroupSigned" DROP CONSTRAINT "UserSeminarGroupSigned_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "studentId" DROP NOT NULL,
ALTER COLUMN "seminarGroupId" DROP NOT NULL,
ADD CONSTRAINT "UserSeminarGroupSigned_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserSeminarGroupTeaches" DROP CONSTRAINT "UserSeminarGroupTeaches_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "tutorId" DROP NOT NULL,
ALTER COLUMN "seminarGroupId" DROP NOT NULL,
ADD CONSTRAINT "UserSeminarGroupTeaches_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserCourseSigned_studentId_courseId_key" ON "UserCourseSigned"("studentId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCourseTeaches_teacherId_courseId_key" ON "UserCourseTeaches"("teacherId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSeminarGroupTeaches_tutorId_seminarGroupId_key" ON "UserSeminarGroupTeaches"("tutorId", "seminarGroupId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeminarGroup" ADD CONSTRAINT "SeminarGroup_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_userId_courseId_fkey" FOREIGN KEY ("userId", "courseId") REFERENCES "UserCourseSigned"("studentId", "courseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseSigned" ADD CONSTRAINT "UserCourseSigned_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseSigned" ADD CONSTRAINT "UserCourseSigned_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseTeaches" ADD CONSTRAINT "UserCourseTeaches_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseTeaches" ADD CONSTRAINT "UserCourseTeaches_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeminarGroupSigned" ADD CONSTRAINT "UserSeminarGroupSigned_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeminarGroupSigned" ADD CONSTRAINT "UserSeminarGroupSigned_seminarGroupId_fkey" FOREIGN KEY ("seminarGroupId") REFERENCES "SeminarGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeminarGroupTeaches" ADD CONSTRAINT "UserSeminarGroupTeaches_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeminarGroupTeaches" ADD CONSTRAINT "UserSeminarGroupTeaches_seminarGroupId_fkey" FOREIGN KEY ("seminarGroupId") REFERENCES "SeminarGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
