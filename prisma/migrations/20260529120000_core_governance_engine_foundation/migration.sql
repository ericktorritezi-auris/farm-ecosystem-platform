-- CreateEnum
CREATE TYPE "VersionStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'PUBLISHED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "VersionedEntityType" AS ENUM ('SYSTEM', 'MODULE', 'FEATURE', 'FUNCTIONAL_ITEM', 'DOCUMENT_TEMPLATE', 'ADHERENCE_ANALYSIS');

-- CreateEnum
CREATE TYPE "SnapshotType" AS ENUM ('BEFORE', 'AFTER', 'APPROVED', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "ChangeType" AS ENUM ('CREATE', 'UPDATE', 'REORDER', 'REPLACE', 'LOGICAL_DELETE', 'RESTORE', 'IMPORT', 'APPROVAL_DECISION');

-- CreateEnum
CREATE TYPE "DocumentDiffMarker" AS ENUM ('NONE', 'INSERTED', 'UPDATED', 'REMOVED', 'REPLACED', 'MOVED');

-- CreateEnum
CREATE TYPE "ChangeImpactLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- DropForeignKey
ALTER TABLE "ApprovalRequest" DROP CONSTRAINT "ApprovalRequest_versionId_fkey";

-- DropForeignKey
ALTER TABLE "FunctionalItemVersion" DROP CONSTRAINT "FunctionalItemVersion_createdById_fkey";

-- DropForeignKey
ALTER TABLE "FunctionalItemVersion" DROP CONSTRAINT "FunctionalItemVersion_functionalItemId_fkey";

-- DropForeignKey
ALTER TABLE "FunctionalItemVersion" DROP CONSTRAINT "FunctionalItemVersion_opinionTypeId_fkey";

-- DropIndex
DROP INDEX "System_slug_key";

-- AlterTable
ALTER TABLE "ApprovalRequest" ADD COLUMN "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Feature" ADD COLUMN "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FunctionalItem" DROP COLUMN "opinion",
ADD COLUMN "companyId" TEXT NOT NULL,
ADD COLUMN "deletedAt" TIMESTAMP(3),
ADD COLUMN "deletedById" TEXT,
ADD COLUMN "deletedReason" TEXT,
ADD COLUMN "hierarchyCode" TEXT NOT NULL,
ADD COLUMN "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "opinionTypeId" TEXT,
ADD COLUMN "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "System" ADD COLUMN "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SystemModule" ADD COLUMN "companyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "FunctionalItemVersion";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyUserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyUserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "entityType" "VersionedEntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "versionCode" TEXT NOT NULL,
    "status" "VersionStatus" NOT NULL DEFAULT 'DRAFT',
    "baseVersionId" TEXT,
    "createdById" TEXT NOT NULL,
    "approvedById" TEXT,
    "publishedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Snapshot" (
    "id" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "entityType" "VersionedEntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "snapshotType" "SnapshotType" NOT NULL,
    "data" JSONB NOT NULL,
    "treeContext" JSONB,
    "hierarchyContext" JSONB,
    "documentRenderContext" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangeSet" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "entityType" "VersionedEntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "changeType" "ChangeType" NOT NULL,
    "baseVersionId" TEXT,
    "targetVersionId" TEXT,
    "approvalRequestId" TEXT,
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChangeSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangeSetItem" (
    "id" TEXT NOT NULL,
    "changeSetId" TEXT NOT NULL,
    "entityType" "VersionedEntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "fieldPath" TEXT NOT NULL,
    "previousValue" JSONB,
    "nextValue" JSONB,
    "oldPosition" INTEGER,
    "newPosition" INTEGER,
    "oldHierarchyCode" TEXT,
    "newHierarchyCode" TEXT,
    "documentMarker" "DocumentDiffMarker" NOT NULL DEFAULT 'NONE',
    "renderHint" TEXT,
    "impactLevel" "ChangeImpactLevel" NOT NULL DEFAULT 'LOW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChangeSetItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE INDEX "CompanyUserRole_companyId_roleId_idx" ON "CompanyUserRole"("companyId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUserRole_userId_companyId_key" ON "CompanyUserRole"("userId", "companyId");

-- CreateIndex
CREATE INDEX "Version_companyId_entityType_entityId_idx" ON "Version"("companyId", "entityType", "entityId");

-- CreateIndex
CREATE INDEX "Version_status_idx" ON "Version"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Version_entityType_entityId_versionCode_key" ON "Version"("entityType", "entityId", "versionCode");

-- CreateIndex
CREATE INDEX "Snapshot_versionId_snapshotType_idx" ON "Snapshot"("versionId", "snapshotType");

-- CreateIndex
CREATE INDEX "Snapshot_entityType_entityId_idx" ON "Snapshot"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "ChangeSet_companyId_entityType_entityId_idx" ON "ChangeSet"("companyId", "entityType", "entityId");

-- CreateIndex
CREATE INDEX "ChangeSet_changeType_idx" ON "ChangeSet"("changeType");

-- CreateIndex
CREATE INDEX "ChangeSetItem_changeSetId_idx" ON "ChangeSetItem"("changeSetId");

-- CreateIndex
CREATE INDEX "ChangeSetItem_entityType_entityId_idx" ON "ChangeSetItem"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "ApprovalRequest_companyId_status_idx" ON "ApprovalRequest"("companyId", "status");

-- CreateIndex
CREATE INDEX "Feature_companyId_idx" ON "Feature"("companyId");

-- CreateIndex
CREATE INDEX "FunctionalItem_companyId_systemId_moduleId_featureId_idx" ON "FunctionalItem"("companyId", "systemId", "moduleId", "featureId");

-- CreateIndex
CREATE INDEX "FunctionalItem_featureId_position_idx" ON "FunctionalItem"("featureId", "position");

-- CreateIndex
CREATE INDEX "FunctionalItem_featureId_hierarchyCode_idx" ON "FunctionalItem"("featureId", "hierarchyCode");

-- CreateIndex
CREATE INDEX "System_companyId_idx" ON "System"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "System_companyId_slug_key" ON "System"("companyId", "slug");

-- CreateIndex
CREATE INDEX "SystemModule_companyId_idx" ON "SystemModule"("companyId");

-- AddForeignKey
ALTER TABLE "CompanyUserRole" ADD CONSTRAINT "CompanyUserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUserRole" ADD CONSTRAINT "CompanyUserRole_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUserRole" ADD CONSTRAINT "CompanyUserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "System" ADD CONSTRAINT "System_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemModule" ADD CONSTRAINT "SystemModule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunctionalItem" ADD CONSTRAINT "FunctionalItem_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunctionalItem" ADD CONSTRAINT "FunctionalItem_opinionTypeId_fkey" FOREIGN KEY ("opinionTypeId") REFERENCES "OpinionType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunctionalItem" ADD CONSTRAINT "FunctionalItem_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_baseVersionId_fkey" FOREIGN KEY ("baseVersionId") REFERENCES "Version"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snapshot" ADD CONSTRAINT "Snapshot_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeSet" ADD CONSTRAINT "ChangeSet_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeSet" ADD CONSTRAINT "ChangeSet_baseVersionId_fkey" FOREIGN KEY ("baseVersionId") REFERENCES "Version"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeSet" ADD CONSTRAINT "ChangeSet_targetVersionId_fkey" FOREIGN KEY ("targetVersionId") REFERENCES "Version"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeSet" ADD CONSTRAINT "ChangeSet_approvalRequestId_fkey" FOREIGN KEY ("approvalRequestId") REFERENCES "ApprovalRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeSet" ADD CONSTRAINT "ChangeSet_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeSetItem" ADD CONSTRAINT "ChangeSetItem_changeSetId_fkey" FOREIGN KEY ("changeSetId") REFERENCES "ChangeSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE SET NULL ON UPDATE CASCADE;
