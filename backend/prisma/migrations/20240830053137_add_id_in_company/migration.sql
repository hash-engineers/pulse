-- CreateEnum
CREATE TYPE "ERole" AS ENUM ('CEO', 'CTO', 'CIO', 'COO', 'CFO', 'SRE', 'SOFTWARE_ENGINEER', 'SENIOR_SOFTWARE_ENGINEER', 'LEAD_ENGINEER', 'ENGINEERING_MANAGER', 'DEVOPS_ENGINEER', 'QA_ENGINEER', 'SDET', 'SYSTEMS_ARCHITECT', 'UI_ENGINEER', 'BACKEND_ENGINEER', 'FRONTEND_ENGINEER', 'PRODUCT_MANAGER', 'PRODUCT_OWNER', 'UX_DESIGNER', 'UIUX_DESIGNER', 'BUSINESS_ANALYST', 'GRAPHIC_DESIGNER', 'INTERACTION_DESIGNER', 'VISUAL_DESIGNER', 'MARKETING_MANAGER', 'SALES_MANAGER', 'CUSTOMER_SUCCESS_MANAGER', 'ACCOUNT_EXECUTIVE', 'IT_SUPPORT', 'SYSTEM_ADMINISTRATOR', 'NETWORK_ADMINISTRATOR', 'OPERATIONS_MANAGER', 'HR_MANAGER', 'RECRUITER', 'FINANCIAL_ANALYST', 'ACCOUNTANT', 'EXECUTIVE_ASSISTANT', 'OFFICE_MANAGER', 'LEGAL_COUNSEL', 'COMPLIANCE_OFFICER');

-- CreateEnum
CREATE TYPE "ECompanySize" AS ENUM ('JUST__ME', 'ONE__TO__FIVE', 'SIX__TO__TEN', 'ELEVEN__TO__TWENTY', 'TWENTY_ONE__TO__FIFTY', 'FIFTY_ONE__TO__HUNDRED', 'ONE_HUNDRED_ONE__TO__FIVE_HUNDRED', 'FIVE_HUNDRED_ONE__TO__ONE_THOUSAND', 'ONE_THOUSAND_ONE__TO__TWO_THOUSAND', 'TWO_THOUSAN_PLUS');

-- CreateEnum
CREATE TYPE "EWhenToAlert" AS ENUM ('URL_BECOMES_UNAVAILABLE', 'URL_DOES_NOT_CONTAIN_KEYWORD', 'URL_CONTAINS_A_KEYWORD', 'URL_RETURNS_HTTP_STATUS_OTHER_THAN', 'HOST_DOES_NOT_RESPOND_TO_PING');

-- CreateEnum
CREATE TYPE "ENextAction" AS ENUM ('DO_NOTHING', 'IMMEDIATELY_ALERT_ALL_OTHER_TEAM_MEMBER', 'WITHIN_3_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS', 'WITHIN_5_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS', 'WITHIN_10_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS');

-- CreateEnum
CREATE TYPE "EMonitorStatus" AS ENUM ('UP', 'DOWN', 'PAUSED', 'PENDING');

-- CreateEnum
CREATE TYPE "EIncidentStatus" AS ENUM ('ONGOING', 'ACKNOWLEDGED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "ESubscriptionPlan" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "ESubscriptionPeriod" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "ERole" DEFAULT 'SRE',
    "companyName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" "ECompanySize" NOT NULL DEFAULT 'JUST__ME',
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitors" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT,
    "statusCode" INTEGER NOT NULL DEFAULT 200,
    "status" "EMonitorStatus" NOT NULL DEFAULT 'PENDING',
    "downtime" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "call" BOOLEAN NOT NULL DEFAULT false,
    "sendSMS" BOOLEAN NOT NULL DEFAULT false,
    "sendEmail" BOOLEAN NOT NULL DEFAULT true,
    "pushNotification" BOOLEAN NOT NULL DEFAULT false,
    "whenToAlert" "EWhenToAlert" NOT NULL DEFAULT 'URL_BECOMES_UNAVAILABLE',
    "nextAction" "ENextAction" NOT NULL DEFAULT 'WITHIN_3_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS',
    "companyName" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "statusCode" INTEGER,
    "statusMessage" TEXT,
    "status" "EIncidentStatus" NOT NULL DEFAULT 'ONGOING',
    "monitorId" TEXT NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "plan" "ESubscriptionPlan" NOT NULL,
    "period" "ESubscriptionPeriod" NOT NULL,
    "companyName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "companies_customerId_key" ON "companies"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "monitors_url_key" ON "monitors"("url");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_companyName_key" ON "subscriptions"("companyName");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "companies"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "companies"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "companies"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
