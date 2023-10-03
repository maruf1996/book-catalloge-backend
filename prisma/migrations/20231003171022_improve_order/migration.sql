/*
  Warnings:

  - The `ordered_books` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `rating` on the `reviews_and_ratings` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "ordered_books",
ADD COLUMN     "ordered_books" JSONB[];

-- AlterTable
ALTER TABLE "reviews_and_ratings" ALTER COLUMN "rating" SET DATA TYPE INTEGER;
