/*
  Warnings:

  - The `ordered_books` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "ordered_books",
ADD COLUMN     "ordered_books" JSONB[];
