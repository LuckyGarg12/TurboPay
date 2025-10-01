/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."AuthType" AS ENUM ('Google', 'Github');

-- CreateEnum
CREATE TYPE "public"."OnRampStatus" AS ENUM ('Success', 'Failure', 'Processing');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."merchant" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "auth_type" "public"."AuthType" NOT NULL
);

-- CreateTable
CREATE TABLE "public"."OnRampTransaction" (
    "id" TEXT NOT NULL,
    "status" "public"."OnRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OnRampTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."balance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "locked" INTEGER NOT NULL,

    CONSTRAINT "balance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "merchant_email_key" ON "public"."merchant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_token_key" ON "public"."OnRampTransaction"("token");

-- CreateIndex
CREATE UNIQUE INDEX "balance_userId_key" ON "public"."balance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "public"."User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "public"."User"("password");

-- AddForeignKey
ALTER TABLE "public"."OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."balance" ADD CONSTRAINT "balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
