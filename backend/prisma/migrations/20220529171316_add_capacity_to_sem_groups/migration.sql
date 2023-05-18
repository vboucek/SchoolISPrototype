/*
  Warnings:

  - Added the required column `endType` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `SeminarGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `SeminarGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EndType" AS ENUM ('z', 'k', 'zk');

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_userId_courseId_fkey";

-- DropIndex
DROP INDEX "Evaluation_userId_courseId_key";

-- DropIndex
DROP INDEX "UserCourseSigned_studentId_courseId_key";

-- DropIndex
DROP INDEX "UserCourseTeaches_teacherId_courseId_key";

-- DropIndex
DROP INDEX "UserSeminarGroupSigned_studentId_courseId_key";

-- DropIndex
DROP INDEX "UserSeminarGroupTeaches_tutorId_seminarGroupId_key";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "endType" "EndType" NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SeminarGroup" ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_id_fkey" FOREIGN KEY ("id") REFERENCES "UserCourseSigned"("id") ON DELETE SET NULL ON UPDATE CASCADE;
