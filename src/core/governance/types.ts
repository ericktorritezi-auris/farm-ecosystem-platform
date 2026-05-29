import type {
  ChangeImpactLevel,
  ChangeType,
  DocumentDiffMarker,
  Prisma,
  SnapshotType,
  VersionedEntityType,
  VersionStatus
} from "@prisma/client";

export type GovernanceOperation =
  | "create"
  | "update"
  | "reorder"
  | "replace"
  | "logical_delete"
  | "restore"
  | "approve"
  | "reject"
  | "request_adjustment"
  | "publish"
  | "import"
  | "generate_document";

export type GovernanceContextInput = {
  userId: string;
  companyId: string;
  operation: GovernanceOperation;
  entityType?: VersionedEntityType;
  entityId?: string;
  metadata?: Prisma.JsonObject;
};

export type GovernanceContext = GovernanceContextInput & {
  roleCode: string;
  permissions: string[];
  isMaster: boolean;
};

export type CreateVersionInput = {
  companyId: string;
  entityType: VersionedEntityType;
  entityId: string;
  versionCode: string;
  status?: VersionStatus;
  baseVersionId?: string | null;
  createdById: string;
};

export type CreateSnapshotInput = {
  versionId: string;
  entityType: VersionedEntityType;
  entityId: string;
  snapshotType: SnapshotType;
  data: Prisma.InputJsonValue;
  treeContext?: Prisma.InputJsonValue;
  hierarchyContext?: Prisma.InputJsonValue;
  documentRenderContext?: Prisma.InputJsonValue;
};

export type CreateChangeSetInput = {
  companyId: string;
  entityType: VersionedEntityType;
  entityId: string;
  changeType: ChangeType;
  baseVersionId?: string | null;
  targetVersionId?: string | null;
  approvalRequestId?: string | null;
  reason?: string | null;
  createdById: string;
  items?: CreateChangeSetItemInput[];
};

export type CreateChangeSetItemInput = {
  entityType: VersionedEntityType;
  entityId: string;
  fieldPath: string;
  previousValue?: Prisma.InputJsonValue;
  nextValue?: Prisma.InputJsonValue;
  oldPosition?: number | null;
  newPosition?: number | null;
  oldHierarchyCode?: string | null;
  newHierarchyCode?: string | null;
  documentMarker?: DocumentDiffMarker;
  renderHint?: string | null;
  impactLevel?: ChangeImpactLevel;
};

export type AuditRecordInput = {
  userId?: string | null;
  entity: string;
  entityId?: string | null;
  action: string;
  previousValue?: Prisma.InputJsonValue;
  newValue?: Prisma.InputJsonValue;
  ipAddress?: string | null;
  metadata?: Prisma.InputJsonValue;
};

export class GovernanceContractNotImplementedError extends Error {
  constructor(serviceName: string, operation: string) {
    super(`${serviceName}.${operation} is a v0.2.0 contract and is not implemented yet.`);
    this.name = "GovernanceContractNotImplementedError";
  }
}
