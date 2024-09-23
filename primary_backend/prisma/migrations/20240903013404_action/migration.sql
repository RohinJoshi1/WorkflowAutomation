-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_typeId_fkey";

-- AlterTable
ALTER TABLE "Trigger" ALTER COLUMN "typeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AvailableTriggers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
