import { prisma } from "@/shared/database/prisma";

import type { CreateVersionInput } from "./types";

export class VersioningService {
  createVersion(input: CreateVersionInput) {
    return prisma.version.create({
      data: {
        companyId: input.companyId,
        entityType: input.entityType,
        entityId: input.entityId,
        versionCode: input.versionCode,
        status: input.status,
        baseVersionId: input.baseVersionId,
        createdById: input.createdById
      }
    });
  }
}
