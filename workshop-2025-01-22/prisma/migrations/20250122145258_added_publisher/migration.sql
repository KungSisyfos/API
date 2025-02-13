-- CreateTable
CREATE TABLE `author` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `pages` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publisher` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_authortobook` (
    `A` INTEGER UNSIGNED NOT NULL,
    `B` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `_authortobook_AB_unique`(`A`, `B`),
    INDEX `_authortobook_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `publisher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_authortobook` ADD CONSTRAINT `_authortobook_A_fkey` FOREIGN KEY (`A`) REFERENCES `author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_authortobook` ADD CONSTRAINT `_authortobook_B_fkey` FOREIGN KEY (`B`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
