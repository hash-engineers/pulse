/*
  Warnings:

  - Added the required column `code` to the `incidents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusMessage` to the `incidents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "incidents" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "statusMessage" TEXT NOT NULL,
ALTER COLUMN "resolvedAt" DROP NOT NULL;
