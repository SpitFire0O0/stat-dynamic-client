/*
  Warnings:

  - A unique constraint covering the columns `[logo]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_logo_key" ON "users"("logo");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_logo_fkey" FOREIGN KEY ("logo") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
