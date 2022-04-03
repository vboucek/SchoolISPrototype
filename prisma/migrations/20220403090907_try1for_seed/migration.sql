/*
  Warnings:

  - The `roles` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isTutor` on the `UserCourseTeaches` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,courseId]` on the table `UserSeminarGroupSigned` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Course_code_title_key";

-- DropIndex
DROP INDEX "UserSeminarGroupSigned_courseId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roles",
ADD COLUMN     "roles" "UserRole"[];

-- AlterTable
ALTER TABLE "UserCourseTeaches" DROP COLUMN "isTutor";

-- CreateIndex
CREATE UNIQUE INDEX "UserSeminarGroupSigned_studentId_courseId_key" ON "UserSeminarGroupSigned"("studentId", "courseId");
