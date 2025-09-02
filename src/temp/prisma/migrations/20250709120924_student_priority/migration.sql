/*
  Warnings:

  - The primary key for the `student_priorities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `student_priorities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `disciplines` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "student_priorities" DROP CONSTRAINT "student_priorities_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "student_priorities_pkey" PRIMARY KEY ("user_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_title_key" ON "disciplines"("title");
