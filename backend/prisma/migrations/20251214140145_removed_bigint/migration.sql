/*
  Warnings:

  - You are about to alter the column `Total_spent` on the `Developer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `Payout` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `locked_Amount` on the `Validator` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `pending_Amount` on the `Validator` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."Developer" ALTER COLUMN "Total_spent" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "public"."Payout" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "public"."Task" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "public"."Validator" ALTER COLUMN "locked_Amount" SET DATA TYPE INTEGER,
ALTER COLUMN "pending_Amount" SET DATA TYPE INTEGER;
