/*
  Warnings:

  - You are about to drop the column `date` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Validator` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Validator` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Validator` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `Validator` table. All the data in the column will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Validator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locked_Amount` to the `Validator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pending_Amount` to the `Validator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_developerId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_developerId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_validatorId_fkey";

-- DropIndex
DROP INDEX "Developer_username_key";

-- DropIndex
DROP INDEX "Developer_wallet_key";

-- DropIndex
DROP INDEX "Validator_username_key";

-- DropIndex
DROP INDEX "Validator_wallet_key";

-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "date",
DROP COLUMN "token",
DROP COLUMN "username",
DROP COLUMN "wallet",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Validator" DROP COLUMN "date",
DROP COLUMN "token",
DROP COLUMN "username",
DROP COLUMN "wallet",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "locked_Amount" INTEGER NOT NULL,
ADD COLUMN     "pending_Amount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Rating";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "developer_Id" INTEGER NOT NULL,
    "signature" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "web_Url" TEXT,
    "github_Url" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "image_Url" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "validator_Id" INTEGER NOT NULL,
    "task_Id" INTEGER NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" SERIAL NOT NULL,
    "developer_Id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "signature" TEXT NOT NULL,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_developer_Id_fkey" FOREIGN KEY ("developer_Id") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_task_Id_fkey" FOREIGN KEY ("task_Id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_validator_Id_fkey" FOREIGN KEY ("validator_Id") REFERENCES "Validator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_developer_Id_fkey" FOREIGN KEY ("developer_Id") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
