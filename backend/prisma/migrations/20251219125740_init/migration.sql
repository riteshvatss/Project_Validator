/*
  Warnings:

  - You are about to drop the column `locked_Amount` on the `Validator` table. All the data in the column will be lost.
  - You are about to drop the column `pending_Amount` on the `Validator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Validator" DROP COLUMN "locked_Amount",
DROP COLUMN "pending_Amount",
ADD COLUMN     "sol_Withdrawable" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sol_Withdrawn" INTEGER NOT NULL DEFAULT 0;
