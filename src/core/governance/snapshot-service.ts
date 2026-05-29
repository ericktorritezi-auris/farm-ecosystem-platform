import { prisma } from "@/shared/database/prisma";

import type { CreateSnapshotInput } from "./types";

export class SnapshotService {
  createSnapshot(input: CreateSnapshotInput) {
    return prisma.snapshot.create({
      data: {
        versionId: input.versionId,
        entityType: input.entityType,
        entityId: input.entityId,
        snapshotType: input.snapshotType,
        data: input.data,
        treeContext: input.treeContext,
        hierarchyContext: input.hierarchyContext,
        documentRenderContext: input.documentRenderContext
      }
    });
  }
}
