-- CreateEnum
CREATE TYPE "ERole" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "ECompanySize" AS ENUM ('JUST__ME', 'ONE__TO__FIVE', 'SIX__TO__TEN', 'ELEVEN__TO__TWENTY', 'TWENTY_ONE__TO__FIFTY', 'FIFTY_ONE__TO__HUNDRED', 'ONE_HUNDRED_ONE__TO__FIVE_HUNDRED', 'FIVE_HUNDRED_ONE__TO__ONE_THOUSAND', 'ONE_THOUSAND_ONE__TO__TWO_THOUSAND', 'TWO_THOUSAN_PLUS');

-- CreateEnum
CREATE TYPE "EWhenToAlert" AS ENUM ('URL_BECOMES_UNAVAILABLE', 'URL_DOES_NOT_CONTAIN_KEYWORD', 'URL_CONTAINS_A_KEYWORD', 'URL_RETURNS_HTTP_STATUS_OTHER_THAN', 'HOST_DOES_NOT_RESPOND_TO_PING');

-- CreateEnum
CREATE TYPE "ENextAction" AS ENUM ('DO_NOTHING', 'IMMEDIATELY_ALERT_ALL_OTHER_TEAM_MEMBER', 'WITHIN_3_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS', 'WITHIN_5_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS', 'WITHIN_10_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "ERole" DEFAULT 'USER',
    "companyName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "name" TEXT NOT NULL,
    "size" "ECompanySize" NOT NULL DEFAULT 'JUST__ME',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "monitors" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "downtime" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "call" BOOLEAN NOT NULL DEFAULT false,
    "sendSMS" BOOLEAN NOT NULL DEFAULT false,
    "sendEmail" BOOLEAN NOT NULL DEFAULT true,
    "pushNotification" BOOLEAN NOT NULL DEFAULT false,
    "whenToAlert" "EWhenToAlert" NOT NULL DEFAULT 'URL_BECOMES_UNAVAILABLE',
    "nextAction" "ENextAction" NOT NULL DEFAULT 'WITHIN_3_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS',
    "companyName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "monitorId" TEXT NOT NULL,
    "resolvedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "monitors_url_key" ON "monitors"("url");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "companies"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "companies"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitors"("url") ON DELETE CASCADE ON UPDATE CASCADE;
