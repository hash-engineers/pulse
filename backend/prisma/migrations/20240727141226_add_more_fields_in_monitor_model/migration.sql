/*
  Warnings:

  - You are about to drop the column `actionsAfterIncident` on the `monitors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "monitors" DROP COLUMN "actionsAfterIncident",
ADD COLUMN     "call" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pushNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sendEmail" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sendSMS" BOOLEAN NOT NULL DEFAULT false;
