/*
  Warnings:

  - The primary key for the `monitors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `monitors` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `monitors` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `monitors` will be added. If there are existing duplicate values, this will fail.
  - Made the column `monitorId` on table `incidents` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `downtime` to the `monitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `monitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "incidents" DROP CONSTRAINT "incidents_monitorId_fkey";

-- DropForeignKey
ALTER TABLE "monitors" DROP CONSTRAINT "monitors_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organizationId_fkey";

-- AlterTable
ALTER TABLE "incidents" ALTER COLUMN "monitorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "monitors" DROP CONSTRAINT "monitors_pkey",
DROP COLUMN "id",
DROP COLUMN "organizationId",
ADD COLUMN     "downtime" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "organizationId",
ADD COLUMN     "companyName" TEXT NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- DropTable
DROP TABLE "organizations";

-- CreateTable
CREATE TABLE "companies" (
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "monitors_url_key" ON "monitors"("url");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "companies"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_url_fkey" FOREIGN KEY ("url") REFERENCES "companies"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitors"("url") ON DELETE CASCADE ON UPDATE CASCADE;
