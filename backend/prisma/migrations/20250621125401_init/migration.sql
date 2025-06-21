/*
  Warnings:

  - Added the required column `idNumber` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guest` ADD COLUMN `idNumber` VARCHAR(191) NOT NULL;
