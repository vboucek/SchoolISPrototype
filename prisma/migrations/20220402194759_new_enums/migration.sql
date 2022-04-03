/*
  Warnings:

  - You are about to drop the column `lectureEndTime` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `lectureStartTime` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `SeminarGroup` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `SeminarGroup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code,title]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[charRepresent]` on the table `Mark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numericRepresent]` on the table `Mark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,semesterType]` on the table `Semester` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lectureDay` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectureDurationMin` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectureStartTimeMin` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `semesterType` on the `Semester` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `seminarGroupDay` to the `SeminarGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seminarGroupDurationMins` to the `SeminarGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seminarGroupDurationStartTimeMins` to the `SeminarGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SemesterType" AS ENUM ('summer', 'winter');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin', 'teacher');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "lectureEndTime",
DROP COLUMN "lectureStartTime",
ADD COLUMN     "lectureDay" "Day" NOT NULL,
ADD COLUMN     "lectureDurationMin" INTEGER NOT NULL,
ADD COLUMN     "lectureStartTimeMin" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Mark" ALTER COLUMN "numericRepresent" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "semesterType",
ADD COLUMN     "semesterType" "SemesterType" NOT NULL;

-- AlterTable
ALTER TABLE "SeminarGroup" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "seminarGroupDay" "Day" NOT NULL,
ADD COLUMN     "seminarGroupDurationMins" INTEGER NOT NULL,
ADD COLUMN     "seminarGroupDurationStartTimeMins" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_title_key" ON "Course"("code", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_name_key" ON "Faculty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mark_charRepresent_key" ON "Mark"("charRepresent");

-- CreateIndex
CREATE UNIQUE INDEX "Mark_numericRepresent_key" ON "Mark"("numericRepresent");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_year_semesterType_key" ON "Semester"("year", "semesterType");
