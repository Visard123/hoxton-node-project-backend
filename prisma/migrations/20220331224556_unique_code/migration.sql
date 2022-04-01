/*
  Warnings:

  - A unique constraint covering the columns `[uniqueCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueCode_key" ON "User"("uniqueCode");
