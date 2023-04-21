/*
  Warnings:

  - You are about to drop the column `hidden_commnet` on the `User` table. All the data in the column will be lost.
  - Added the required column `hidden_comment` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hidden_commnet",
ADD COLUMN     "hidden_comment" TEXT NOT NULL;
