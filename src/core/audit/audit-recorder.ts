import { AuditResult } from "@prisma/client";

import { prisma } from "@/shared/database/prisma";

import type { AuditRecordInput } from "@/core/governance";

export class AuditRecorder {
  recordSuccess(input: AuditRecordInput) {
    return prisma.auditLog.create({
      data: {
        userId: input.userId,
        entity: input.entity,
        entityId: input.entityId,
        action: input.action,
        previousValue: input.previousValue,
        newValue: input.newValue,
        result: AuditResult.SUCCESS,
        ipAddress: input.ipAddress,
        metadata: input.metadata
      }
    });
  }

  recordFailure(input: AuditRecordInput) {
    return prisma.auditLog.create({
      data: {
        userId: input.userId,
        entity: input.entity,
        entityId: input.entityId,
        action: input.action,
        previousValue: input.previousValue,
        newValue: input.newValue,
        result: AuditResult.FAILURE,
        ipAddress: input.ipAddress,
        metadata: input.metadata
      }
    });
  }
}
