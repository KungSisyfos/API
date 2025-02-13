/*
  Warnings:

  - You are about to drop the column `isbn` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Author` ADD COLUMN `birthyear` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `isbn`;
