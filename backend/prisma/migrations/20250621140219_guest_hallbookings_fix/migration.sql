/*
  Warnings:

  - Added the required column `bookingSource` to the `HallBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hallbooking` ADD COLUMN `bookingSource` ENUM('WALK_IN', 'ONLINE', 'AGENT') NOT NULL;
