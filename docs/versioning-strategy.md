# Estrategia de Versionamento

## Objetivo

Definir versionamento como conceito central do SpecGov.

## Entidades

```text
Version
Snapshot
ChangeSet
ChangeSetItem
ApprovalHistory
```

`FunctionalItemVersion` foi removida da arquitetura fisica na v0.2.0. Particularidades/funcoes usam o mesmo modelo generico de versionamento das demais entidades governadas.

## Version

Representa um marco versionado.

Campos canonicos:

- `companyId`;
- `entityType`;
- `entityId`;
- `versionCode`;
- `status`;
- `baseVersionId`;
- `createdById`;
- `approvedById`;
- `publishedAt`;
- `approvedAt`;
- `createdAt`.

## Snapshot

Estado completo relevante de uma entidade no momento da versao.

Campos canonicos:

- `versionId`;
- `entityType`;
- `entityId`;
- `snapshotType`;
- `data`;
- `treeContext`;
- `hierarchyContext`;
- `documentRenderContext`;
- `createdAt`.

Deve incluir:

- dados funcionais;
- hierarquia;
- abrangencia estadual;
- status;
- parecer;
- relacoes relevantes;
- metadados de empresa.

`treeContext` deve preservar o contexto da arvore afetada, incluindo ancestrais e irmaos relevantes para reordenacao.

`hierarchyContext` deve preservar:

- `oldPosition`;
- `newPosition`;
- `oldHierarchyCode`;
- `newHierarchyCode`;
- lista de itens afetados por renumeracao.

`documentRenderContext` deve preservar informacoes necessarias para documento comparativo, incluindo marcadores, observacoes e relacoes de substituicao.

## ChangeSet

Representa a mudanca entre dois estados.

Campos canonicos:

- `companyId`;
- `entityType`;
- `entityId`;
- `changeType`;
- `baseVersionId`;
- `targetVersionId`;
- `approvalRequestId`;
- `reason`;
- `createdById`;
- `createdAt`.

Tipos:

- `CREATE`;
- `UPDATE`;
- `REORDER`;
- `REPLACE`;
- `LOGICAL_DELETE`;
- `RESTORE`;
- `IMPORT`;
- `APPROVAL_DECISION`;

## ChangeSetItem

Detalha mudancas:

Campos canonicos:

- `changeSetId`;
- `entityType`;
- `entityId`;
- `fieldPath`;
- `previousValue`;
- `nextValue`;
- `oldPosition`;
- `newPosition`;
- `oldHierarchyCode`;
- `newHierarchyCode`;
- `documentMarker`;
- `renderHint`;
- `impactLevel`.

`documentMarker` deve usar o contrato `DocumentDiffMarker`.

`renderHint` deve orientar a renderizacao futura do comparativo, por exemplo: tachado, destaque, comentario, bloco substituido ou indicacao de movimento.

## ApprovalHistory

Guarda o historico decisorio:

- solicitante;
- aprovador;
- decisao;
- parecer;
- data/hora;
- etapa;
- status anterior;
- status novo.

Na v0.2.0, `ApprovalRequest.versionId` referencia `Version`, nao uma entidade especifica de particularidade.

## Criacao

Criar item deve gerar:

- Snapshot inicial;
- Version inicial;
- ChangeSet `CREATE`;
- AuditLog.

## Edicao

Edicao relevante deve gerar:

- Snapshot anterior;
- Snapshot novo proposto;
- ChangeSet `UPDATE`;
- ApprovalRequest quando regra exigir;
- AuditLog.

## Aprovacao

Aprovacao deve:

- registrar ApprovalHistory;
- mudar status da versao;
- publicar snapshot aprovado;
- registrar AuditLog.

## Substituicao

Substituir deve:

- preservar item original;
- criar ou vincular item substituto;
- criar `FunctionalItemReplacementGroup`;
- criar vinculos `FunctionalItemReplacement`;
- gerar ChangeSet `REPLACE`;
- gerar ChangeSet `REORDER` quando houver impacto na numeracao;
- refletir no comparativo documental.

Substituicoes suportadas:

- 1 item antigo para 1 item novo;
- 1 item antigo para varios itens novos;
- varios itens antigos para 1 item novo;
- varios itens antigos para varios itens novos;
- item removido sem substituicao.

## Exclusao logica

Exclusao logica deve:

- marcar `isDeleted`;
- registrar motivo;
- manter historico;
- gerar ChangeSet `LOGICAL_DELETE`;
- refletir item removido no comparativo documental.

## Reordenacao

Reordenacao deve:

- recalcular posicoes e codigos hierarquicos afetados;
- gerar ChangeSet `REORDER`;
- preservar snapshot anterior;
- auditar usuario, empresa e motivo.

Toda reordenacao deve gerar `ChangeSetItem` para cada entidade impactada com:

- `oldPosition`;
- `newPosition`;
- `oldHierarchyCode`;
- `newHierarchyCode`;
- `documentMarker = MOVED`;
- `impactLevel` proporcional ao impacto documental.

## Comparativo documental

O comparativo deve usar ChangeSets e Snapshots, nao comparacao textual ad hoc.

Estados:

- `INSERTED`;
- `REMOVED`;
- `REPLACED`;
- `UPDATED`;
- `MOVED`;
- `NONE`.

Esses estados devem ser expressos por `DocumentDiffMarker` em cada `ChangeSetItem`.
