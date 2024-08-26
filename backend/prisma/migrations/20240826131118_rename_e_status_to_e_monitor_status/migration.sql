/*
  Warnings:

  - The `status` column on the `monitors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EMonitorStatus" AS ENUM ('UP', 'DOWN', 'PAUSED', 'PENDING');

-- AlterTable
ALTER TABLE "monitors" DROP COLUMN "status",
ADD COLUMN     "status" "EMonitorStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "EStatus";
