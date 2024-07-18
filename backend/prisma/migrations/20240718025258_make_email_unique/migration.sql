/*
  Warnings:

  - The values [TWENTYONE__TO__FIFTY,FIFTYONE__TO__HUNDRED,FIVE_HUNDRED_ONE__TO__THOUSAND,ONE_THOUSAND__TO__TWO_THOUSAND] on the enum `ECompanySize` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ECompanySize_new" AS ENUM ('JUST__ME', 'ONE__TO__FIVE', 'SIX__TO__TEN', 'ELEVEN__TO__TWENTY', 'TWENTY_ONE__TO__FIFTY', 'FIFTY_ONE__TO__HUNDRED', 'ONE_HUNDRED_ONE__TO__FIVE_HUNDRED', 'FIVE_HUNDRED_ONE__TO__ONE_THOUSAND', 'ONE_THOUSAND_ONE__TO__TWO_THOUSAND', 'TWO_THOUSAN_PLUS');
ALTER TABLE "companies" ALTER COLUMN "size" TYPE "ECompanySize_new" USING ("size"::text::"ECompanySize_new");
ALTER TYPE "ECompanySize" RENAME TO "ECompanySize_old";
ALTER TYPE "ECompanySize_new" RENAME TO "ECompanySize";
DROP TYPE "ECompanySize_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
