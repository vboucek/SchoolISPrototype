/*
  Warnings:

  - Made the column `facultyId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `semesterId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "facultyId" SET NOT NULL,
ALTER COLUMN "semesterId" SET NOT NULL;
