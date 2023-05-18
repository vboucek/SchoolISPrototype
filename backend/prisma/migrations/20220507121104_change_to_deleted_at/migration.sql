/*
  Warnings:

  - Made the column `semesterId` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `creatorId` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facultyId` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courseId` on table `Evaluation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Evaluation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courseId` on table `SeminarGroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `UserCourseSigned` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courseId` on table `UserCourseSigned` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacherId` on table `UserCourseTeaches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courseId` on table `UserCourseTeaches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `UserSeminarGroupSigned` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seminarGroupId` on table `UserSeminarGroupSigned` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tutorId` on table `UserSeminarGroupTeaches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seminarGroupId` on table `UserSeminarGroupTeaches` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "SeminarGroup" DROP CONSTRAINT "SeminarGroup_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "semesterId" SET NOT NULL,
ALTER COLUMN "creatorId" SET NOT NULL,
ALTER COLUMN "facultyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Evaluation" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "courseId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Mark" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Semester" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SeminarGroup" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "courseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserCourseSigned" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "studentId" SET NOT NULL,
ALTER COLUMN "courseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserCourseTeaches" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "teacherId" SET NOT NULL,
ALTER COLUMN "courseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserSeminarGroupSigned" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "studentId" SET NOT NULL,
ALTER COLUMN "seminarGroupId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserSeminarGroupTeaches" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "tutorId" SET NOT NULL,
ALTER COLUMN "seminarGroupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeminarGroup" ADD CONSTRAINT "SeminarGroup_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
