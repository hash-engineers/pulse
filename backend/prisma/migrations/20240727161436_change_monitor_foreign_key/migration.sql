/*
  Warnings:

  - Added the required column `companyName` to the `monitors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "monitors" DROP CONSTRAINT "monitors_url_fkey";

-- AlterTable
ALTER TABLE "monitors" ADD COLUMN     "companyName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "companies"("name") ON DELETE CASCADE ON UPDATE CASCADE;
