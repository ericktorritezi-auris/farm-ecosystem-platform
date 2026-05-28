-- CreateEnum
CREATE TYPE "FunctionalItemScopeType" AS ENUM ('GENERAL', 'STATE_SPECIFIC');

-- AlterTable
ALTER TABLE "FunctionalItem" ADD COLUMN     "scopeType" "FunctionalItemScopeType" NOT NULL DEFAULT 'GENERAL';

-- AlterTable
ALTER TABLE "FunctionalItemVersion" ADD COLUMN     "scopeSnapshot" JSONB;

-- CreateTable
CREATE TABLE "BrazilianState" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrazilianState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FunctionalItemState" (
    "id" TEXT NOT NULL,
    "functionalItemId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FunctionalItemState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrazilianState_code_key" ON "BrazilianState"("code");

-- CreateIndex
CREATE UNIQUE INDEX "FunctionalItemState_functionalItemId_stateId_key" ON "FunctionalItemState"("functionalItemId", "stateId");

-- AddForeignKey
ALTER TABLE "FunctionalItemState" ADD CONSTRAINT "FunctionalItemState_functionalItemId_fkey" FOREIGN KEY ("functionalItemId") REFERENCES "FunctionalItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunctionalItemState" ADD CONSTRAINT "FunctionalItemState_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "BrazilianState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
