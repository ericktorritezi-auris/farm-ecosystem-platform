import { prisma } from "@/shared/database/prisma";

import type { CreateChangeSetInput } from "./types";

export class ChangeSetService {
  createChangeSet(input: CreateChangeSetInput) {
    return prisma.changeSet.create({
      data: {
        companyId: input.companyId,
        entityType: input.entityType,
        entityId: input.entityId,
        changeType: input.changeType,
        baseVersionId: input.baseVersionId,
        targetVersionId: input.targetVersionId,
        approvalRequestId: input.approvalRequestId,
        reason: input.reason,
        createdById: input.createdById,
        items: input.items?.length
          ? {
              create: input.items.map((item) => ({
                entityType: item.entityType,
                entityId: item.entityId,
                fieldPath: item.fieldPath,
                previousValue: item.previousValue,
                nextValue: item.nextValue,
                oldPosition: item.oldPosition,
                newPosition: item.newPosition,
                oldHierarchyCode: item.oldHierarchyCode,
                newHierarchyCode: item.newHierarchyCode,
                documentMarker: item.documentMarker,
                renderHint: item.renderHint,
                impactLevel: item.impactLevel
              }))
            }
          : undefined
      }
    });
  }
}
