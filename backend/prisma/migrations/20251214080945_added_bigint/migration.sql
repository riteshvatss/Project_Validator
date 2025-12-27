-- AlterTable
ALTER TABLE "public"."Developer" ALTER COLUMN "Total_spent" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "public"."Payout" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "public"."Task" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "public"."Validator" ALTER COLUMN "locked_Amount" SET DATA TYPE BIGINT,
ALTER COLUMN "pending_Amount" SET DATA TYPE BIGINT;
