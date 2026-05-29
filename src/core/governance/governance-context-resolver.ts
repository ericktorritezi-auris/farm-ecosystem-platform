import { prisma } from "@/shared/database/prisma";

import type { GovernanceContext, GovernanceContextInput } from "./types";
import { GovernanceContractNotImplementedError } from "./types";

export class GovernanceContextResolver {
  resolve(input: GovernanceContextInput): Promise<GovernanceContext> {
    void input;

    return Promise.reject(
      new GovernanceContractNotImplementedError("GovernanceContextResolver", "resolve")
    );
  }

  async assertCompanyAccess(userId: string, companyId: string) {
    const companyRole = await prisma.companyUserRole.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId
        }
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true
              }
            }
          }
        }
      }
    });

    if (!companyRole?.isActive) {
      throw new Error("Usuario sem papel ativo para a empresa informada.");
    }

    return companyRole;
  }
}
