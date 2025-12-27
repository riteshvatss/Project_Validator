-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "comment" TEXT,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "average_Rating" INTEGER NOT NULL DEFAULT 0;
