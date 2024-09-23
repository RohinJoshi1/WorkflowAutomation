/*
  Warnings:

  - You are about to drop the column `zapRunOutBoxId` on the `ZapRun` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ZapRun_zapRunOutBoxId_key";

-- AlterTable
ALTER TABLE "ZapRun" DROP COLUMN "zapRunOutBoxId";
