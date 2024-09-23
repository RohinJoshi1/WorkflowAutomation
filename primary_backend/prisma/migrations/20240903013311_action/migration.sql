-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_typeId_fkey";

-- AlterTable
ALTER TABLE "Action" ALTER COLUMN "typeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AvailableActions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
