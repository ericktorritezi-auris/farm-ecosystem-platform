# Core Governance Engine

## Objetivo

Definir a arquitetura alvo do motor de governanca do SpecGov para a v0.2.0.

O Core Governance Engine orquestra:

- permissoes por empresa;
- workflow de aprovacao;
- versionamento;
- auditoria;
- importacao;
- documentos;
- aderencia;
- substituicoes e exclusoes logicas.

## Responsabilidades

- Resolver o contexto operacional: usuario, empresa, papel e escopo.
- Validar se uma acao e permitida.
- Criar ChangeSets para alteracoes relevantes.
- Criar snapshots antes e depois de mudancas.
- Abrir workflow de aprovacao quando necessario.
- Registrar auditoria imutavel.
- Propagar eventos para documentos, aderencia e importacoes.

## Componentes conceituais

```text
GovernanceContextResolver
PermissionEvaluator
HierarchyNumberingService
VersioningService
SnapshotService
ChangeSetService
ReplacementService
ApprovalOrchestrator
AuditRecorder
DocumentSignalService
ImportGovernanceService
AdherenceSignalService
```

## Contexto de governanca

Toda operacao governada deve receber:

- `userId`;
- `companyId`;
- `roleCode`;
- `permissions`;
- `entity`;
- `entityId`;
- `operation`;
- `metadata`.

## Operacoes governadas

- criar;
- editar;
- reordenar;
- substituir;
- excluir logicamente;
- substituir 1:1, 1:N, N:1 ou N:N;
- renumerar hierarquia;
- aprovar;
- reprovar;
- solicitar ajuste;
- importar;
- gerar documento;
- executar analise de aderencia;
- aplicar override;
- alterar permissoes.

## Resultado padrao

Toda operacao governada deve produzir:

- sucesso ou falha;
- entidade impactada;
- ChangeSet, se houver mudanca;
- Snapshot, se aplicavel;
- FunctionalItemReplacementGroup, quando houver substituicao;
- FunctionalItemReplacement, quando houver vinculos origem/destino;
- AuditLog;
- evento de workflow, se aplicavel.

## Eventos de dominio

Eventos futuros recomendados:

- `FunctionalItemCreated`
- `FunctionalItemChanged`
- `FunctionalItemReordered`
- `FunctionalItemReplaced`
- `FunctionalItemDeleted`
- `HierarchyRenumbered`
- `FunctionalItemReplacementLinked`
- `ApprovalRequested`
- `ApprovalDecisionRecorded`
- `ImportBatchValidated`
- `ImportBatchExecuted`
- `DocumentGenerated`
- `AdherenceAnalysisCompleted`
- `PermissionChanged`

## Riscos de arquitetura

- Acoplar regras de workflow diretamente em telas.
- Permitir edicoes diretas sem ChangeSet.
- Tratar empresa como filtro visual em vez de tenant real.
- Misturar documentos, aderencia e importacao dentro do modulo de especificacoes.

## Recomendacao para v0.2.0

Implementar primeiro:

1. `Company`;
2. `CompanyUserRole` com um papel por empresa;
3. matriz de permissoes;
4. `GovernanceContextResolver`;
5. `AuditRecorder`;
6. base de `Version`, `Snapshot` e `ChangeSet`.
7. `HierarchyRenumberingService`;
8. `ReplacementService`.

Workflow e documentos devem consumir essa base, nao recria-la.

## Decisoes fisicas v0.2.0

- `FunctionalItemVersion` foi substituida pelo modelo generico `Version`, `Snapshot`, `ChangeSet` e `ChangeSetItem`.
- `ApprovalRequest.versionId` passa a apontar para `Version`.
- `System`, `SystemModule`, `Feature` e `FunctionalItem` carregam `companyId`.
- `FunctionalItem` mantem `companyId`, `systemId`, `moduleId` e `featureId` como contexto denormalizado.
- `Feature` permanece a fonte oficial de verdade da hierarquia da particularidade.
- `CompanyUserRole` usa unicidade `userId + companyId` para evitar papeis simultaneos na mesma empresa.
