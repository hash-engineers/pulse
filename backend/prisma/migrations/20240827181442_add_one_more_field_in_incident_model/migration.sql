-- CreateEnum
CREATE TYPE "EIncidentStatus" AS ENUM ('ONGOING', 'ACKNOWLEDGED', 'RESOLVED');

-- AlterTable
ALTER TABLE "incidents" ADD COLUMN     "status" "EIncidentStatus" NOT NULL DEFAULT 'ONGOING';
