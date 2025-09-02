/*
  Warnings:

  - You are about to drop the column `userId` on the `grades` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "grades" DROP CONSTRAINT "grades_userId_fkey";

-- AlterTable
ALTER TABLE "grades" DROP COLUMN "userId";
