import { GovernanceContractNotImplementedError } from "@/core/governance";

export type HierarchyInsertionInput = {
  companyId: string;
  featureId: string;
  requestedPosition?: number;
  requestedById: string;
  reason?: string;
};

export type HierarchyMoveInput = {
  companyId: string;
  functionalItemId: string;
  targetPosition: number;
  requestedById: string;
  reason: string;
};

export type HierarchyLogicalDeleteInput = {
  companyId: string;
  functionalItemId: string;
  requestedById: string;
  reason: string;
};

export type HierarchyReplacementInput = {
  companyId: string;
  sourceFunctionalItemIds: string[];
  targetFunctionalItemIds: string[];
  requestedById: string;
  reason: string;
};

export class HierarchyRenumberingService {
  calculateNextCode(input: HierarchyInsertionInput): Promise<string> {
    void input;

    return Promise.reject(
      new GovernanceContractNotImplementedError("HierarchyRenumberingService", "calculateNextCode")
    );
  }

  insertAtPosition(input: HierarchyInsertionInput): Promise<void> {
    void input;

    return Promise.reject(
      new GovernanceContractNotImplementedError("HierarchyRenumberingService", "insertAtPosition")
    );
  }

  move(input: HierarchyMoveInput): Promise<void> {
    void input;

    return Promise.reject(
      new GovernanceContractNotImplementedError("HierarchyRenumberingService", "move")
    );
  }

  logicalDelete(input: HierarchyLogicalDeleteInput): Promise<void> {
    void input;

    return Promise.reject(
      new GovernanceContractNotImplementedError("HierarchyRenumberingService", "logicalDelete")
    );
  }

  replace(input: HierarchyReplacementInput): Promise<void> {
    void input;

    return Promise.reject(
      new GovernanceContractNotImplementedError("HierarchyRenumberingService", "replace")
    );
  }
}
