/*
  Warnings:

  - You are about to drop the column `status` on the `incidents` table. All the data in the column will be lost.
  - Added the required column `statusCode` to the `incidents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "incidents" DROP CONSTRAINT "incidents_monitorId_fkey";

-- AlterTable
ALTER TABLE "incidents" DROP COLUMN "status",
ADD COLUMN     "statusCode" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
