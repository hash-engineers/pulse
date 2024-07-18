/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - Added the required column `size` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ECompanySize" AS ENUM ('JUST__ME', 'ONE__TO__FIVE', 'SIX__TO__TEN', 'ELEVEN__TO__TWENTY', 'TWENTYONE__TO__FIFTY', 'FIFTYONE__TO__HUNDRED', 'ONE_HUNDRED_ONE__TO__FIVE_HUNDRED', 'FIVE_HUNDRED_ONE__TO__THOUSAND', 'ONE_THOUSAND__TO__TWO_THOUSAND', 'TWO_THOUSAN_PLUS');

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "size" "ECompanySize" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password";
