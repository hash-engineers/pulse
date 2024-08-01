/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `monitors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "monitors" ADD COLUMN     "checkedAt" TIMESTAMP(3),
ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "monitors_name_key" ON "monitors"("name");
