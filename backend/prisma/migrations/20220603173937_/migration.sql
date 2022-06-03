/*
  Warnings:

  - You are about to drop the column `logoPath` on the `Faculty` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Faculty_name_key";

-- DropIndex
DROP INDEX "Semester_year_semesterType_key";

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "logoPath";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT;
