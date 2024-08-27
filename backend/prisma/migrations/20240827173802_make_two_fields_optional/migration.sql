-- AlterTable
ALTER TABLE "incidents" ALTER COLUMN "statusCode" DROP NOT NULL,
ALTER COLUMN "statusMessage" DROP NOT NULL;
