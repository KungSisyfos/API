-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `book_user_id_fkey`;

-- DropIndex
DROP INDEX `book_user_id_fkey` ON `book`;

-- AlterTable
ALTER TABLE `book` MODIFY `user_id` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `publisher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
