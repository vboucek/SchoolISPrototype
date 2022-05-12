/*
  Warnings:

  - A unique constraint covering the columns `[userId,courseId]` on the table `Evaluation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId]` on the table `UserSeminarGroupSigned` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isHelper` to the `UserCourseTeaches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isLecturer` to the `UserCourseTeaches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTutor` to the `UserCourseTeaches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `UserSeminarGroupSigned` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_markId_fkey";

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_teacherSubmittedId_fkey";

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
ALTER TABLE "Evaluation" ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "markId" DROP NOT NULL,
ALTER COLUMN "teacherSubmittedId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserCourseSigned" ADD COLUMN     "evaluationId" INTEGER,
ADD COLUMN     "isFavourite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserCourseTeaches" ADD COLUMN     "isHelper" BOOLEAN NOT NULL,
ADD COLUMN     "isLecturer" BOOLEAN NOT NULL,
ADD COLUMN     "isTutor" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "UserSeminarGroupSigned" ADD COLUMN     "courseId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_userId_courseId_key" ON "Evaluation"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSeminarGroupSigned_courseId_key" ON "UserSeminarGroupSigned"("courseId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeminarGroup" ADD CONSTRAINT "SeminarGroup_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_teacherSubmittedId_fkey" FOREIGN KEY ("teacherSubmittedId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_markId_fkey" FOREIGN KEY ("markId") REFERENCES "Mark"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_userId_courseId_fkey" FOREIGN KEY ("userId", "courseId") REFERENCES "UserCourseSigned"("studentId", "courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseSigned" ADD CONSTRAINT "UserCourseSigned_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseSigned" ADD CONSTRAINT "UserCourseSigned_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseTeaches" ADD CONSTRAINT "UserCourseTeaches_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseTeaches" ADD CONSTRAINT "UserCourseTeaches_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeminarGroupSigned" ADD CONSTRAINT "UserSeminarGroupSigned_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeminarGroupSigned" ADD CONSTRAINT "UserSeminarGroupSigned_seminarGroupId_fkey" FOREIGN KEY ("seminarGroupId") REFERENCES "SeminarGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeminarGroupTeaches" ADD CONSTRAINT "UserSeminarGroupTeaches_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeminarGroupTeaches" ADD CONSTRAINT "UserSeminarGroupTeaches_seminarGroupId_fkey" FOREIGN KEY ("seminarGroupId") REFERENCES "SeminarGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
