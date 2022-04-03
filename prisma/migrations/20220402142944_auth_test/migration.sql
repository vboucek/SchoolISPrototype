-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_userId_courseId_fkey";

-- CreateTable
CREATE TABLE "DummyUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwdHash" TEXT NOT NULL,

    CONSTRAINT "DummyUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DummyUser_email_key" ON "DummyUser"("email");

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_userId_courseId_fkey" FOREIGN KEY ("userId", "courseId") REFERENCES "UserCourseSigned"("studentId", "courseId") ON DELETE CASCADE ON UPDATE CASCADE;
