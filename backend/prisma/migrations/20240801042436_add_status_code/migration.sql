/*
  Warnings:

  - The `status` column on the `monitors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EStatus" AS ENUM ('UP', 'DOWN', 'PAUSED', 'PENDING');

-- AlterTable
ALTER TABLE "monitors" ADD COLUMN     "statusCode" INTEGER NOT NULL DEFAULT 200,
DROP COLUMN "status",
ADD COLUMN     "status" "EStatus" NOT NULL DEFAULT 'PENDING';
