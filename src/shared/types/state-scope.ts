export const functionalItemScopeTypes = ["GENERAL", "STATE_SPECIFIC"] as const;

export type FunctionalItemScopeType = (typeof functionalItemScopeTypes)[number];

export const brazilianStateCodes = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO"
] as const;

export type BrazilianStateCode = (typeof brazilianStateCodes)[number];

export type FunctionalItemScopeState = {
  code: BrazilianStateCode;
  name: string;
  region?: string | null;
};

export type FunctionalItemScopeSnapshot = {
  scopeType: FunctionalItemScopeType;
  states: FunctionalItemScopeState[];
};

export type DocumentStateFilter = {
  stateCode?: BrazilianStateCode;
};

export function shouldIncludeFunctionalItemByState(
  snapshot: FunctionalItemScopeSnapshot,
  filter: DocumentStateFilter = {}
) {
  if (!filter.stateCode) {
    return true;
  }

  if (snapshot.scopeType === "GENERAL") {
    return true;
  }

  return snapshot.states.some((state) => state.code === filter.stateCode);
}
