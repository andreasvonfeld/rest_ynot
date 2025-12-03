/*
  Warnings:

  - A unique constraint covering the columns `[pseudo]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `game` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `durationMin` INTEGER NULL,
    ADD COLUMN `level` ENUM('ANY', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED') NOT NULL DEFAULT 'ANY',
    ADD COLUMN `maxPlayers` INTEGER NULL,
    ADD COLUMN `pricePerUser` DECIMAL(10, 2) NULL,
    ADD COLUMN `status` ENUM('PLANNED', 'OPEN', 'FULL', 'IN_PROGRESS', 'FINISHED', 'CANCELED') NOT NULL DEFAULT 'OPEN',
    ADD COLUMN `title` VARCHAR(191) NULL,
    ADD COLUMN `venueId` INTEGER NULL,
    ADD COLUMN `visibility` ENUM('PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE `participant` ADD COLUMN `comment` VARCHAR(191) NULL,
    ADD COLUMN `rating` INTEGER NULL,
    ADD COLUMN `role` ENUM('PLAYER', 'SUBSTITUTE') NOT NULL DEFAULT 'PLAYER',
    ADD COLUMN `status` ENUM('PENDING', 'CONFIRMED', 'CANCELED', 'KICKED') NOT NULL DEFAULT 'CONFIRMED';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatarUrl` VARCHAR(191) NULL,
    ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `pseudo` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Venue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `postalCode` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `phone` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,

    INDEX `Venue_city_idx`(`city`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSportPreference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `sportId` INTEGER NOT NULL,
    `level` ENUM('ANY', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED') NOT NULL DEFAULT 'ANY',

    UNIQUE INDEX `UserSportPreference_userId_sportId_key`(`userId`, `sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type` ENUM('GAME_INVITE', 'GAME_STATUS_CHANGE', 'PARTICIPATION_REQUEST', 'PARTICIPATION_ACCEPTED', 'PARTICIPATION_REFUSED') NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gameId` INTEGER NULL,

    INDEX `Notification_userId_isRead_idx`(`userId`, `isRead`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `GameMessage_gameId_idx`(`gameId`),
    INDEX `GameMessage_authorId_idx`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Game_venueId_idx` ON `Game`(`venueId`);

-- CreateIndex
CREATE INDEX `Game_status_idx` ON `Game`(`status`);

-- CreateIndex
CREATE UNIQUE INDEX `User_pseudo_key` ON `User`(`pseudo`);

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `GameType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSportPreference` ADD CONSTRAINT `UserSportPreference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSportPreference` ADD CONSTRAINT `UserSportPreference_sportId_fkey` FOREIGN KEY (`sportId`) REFERENCES `GameType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameMessage` ADD CONSTRAINT `GameMessage_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameMessage` ADD CONSTRAINT `GameMessage_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
