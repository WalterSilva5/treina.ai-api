/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TB_MUSCLE_GROUP` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TB_MUSCLE_GROUP_name_key` ON `TB_MUSCLE_GROUP`(`name`);
