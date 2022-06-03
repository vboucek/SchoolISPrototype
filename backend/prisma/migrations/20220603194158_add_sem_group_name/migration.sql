/*
  Warnings:

  - Added the required column `name` to the `SeminarGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeminarGroup" ADD COLUMN     "name" TEXT NOT NULL;
