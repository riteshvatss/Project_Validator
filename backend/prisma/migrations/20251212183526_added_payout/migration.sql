/*
  Warnings:

  - You are about to drop the column `developer_Id` on the `Payout` table. All the data in the column will be lost.
  - Added the required column `validator_Id` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Payout" DROP CONSTRAINT "Payout_developer_Id_fkey";

-- AlterTable
ALTER TABLE "public"."Payout" DROP COLUMN "developer_Id",
ADD COLUMN     "validator_Id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Payout" ADD CONSTRAINT "Payout_validator_Id_fkey" FOREIGN KEY ("validator_Id") REFERENCES "public"."Validator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
