# Arquitetura de Documentos

## Objetivo

Definir documentos como dominio proprio, preparado para DOCX/PDF futuro sem implementar geracao nesta fase.

## Entidades

```text
DocumentTemplate
DocumentTemplateVersion
DocumentGeneration
DocumentGenerationHistory
```

## DocumentTemplate

Representa um modelo documental por empresa e tipo.

Campos recomendados:

- `companyId`;
- `code`;
- `name`;
- `documentType`;
- `isActive`;
- `createdAt`;
- `updatedAt`.

## DocumentTemplateVersion

Preserva versoes do template.

Campos recomendados:

- `templateId`;
- `version`;
- `contentDefinition`;
- `stylesDefinition`;
- `createdById`;
- `approvedById`;
- `approvedAt`;
- `status`.

## DocumentGeneration

Representa uma solicitacao ou execucao de geracao documental.

Campos recomendados:

- `companyId`;
- `templateVersionId`;
- `generationType`;
- `filters`;
- `status`;
- `requestedById`;
- `generatedFileRef`;
- `createdAt`;
- `finishedAt`.

## DocumentGenerationHistory

Registra eventos da geracao:

- solicitacao;
- validacao de filtros;
- montagem de dados;
- geracao;
- falha;
- download;
- cancelamento.

## Tipos documentais

- `FULL_CURRENT`: documento completo vigente.
- `FULL_COMPARATIVE`: documento completo comparativo.
- `MODULE_CURRENT`: documento de modulo vigente.
- `MODULE_COMPARATIVE`: documento comparativo por modulo.

## Filtro estadual

Entrada futura:

- `stateCode` opcional.

Sem `stateCode`:

- listar todas as particularidades;
- sinalizar itens `STATE_SPECIFIC` com suas UFs.

Com `stateCode`:

- incluir itens `GENERAL`;
- incluir itens `STATE_SPECIFIC` vinculados a UF;
- excluir itens especificos de outras UFs.

## Comparativo documental

Estados de mudanca:

- `INSERTED`: item inserido.
- `REMOVED`: item removido.
- `REPLACED`: item substituido.
- `UPDATED`: item alterado.
- `MOVED`: item movido ou renumerado.
- `NONE`: item sem alteracao relevante.

Contrato formal:

```text
DocumentDiffMarker
  NONE
  INSERTED
  UPDATED
  REMOVED
  REPLACED
  MOVED
```

Marcadores futuros:

- removido: tachado;
- inserido: destaque;
- substituido: comentario e referencia ao substituto;
- alterado: destaque nos campos alterados;
- movido: indicar codigo anterior e novo codigo;
- observacoes: bloco de comentario tecnico.

Regras futuras de renderizacao:

- `INSERTED`: destaque amarelo.
- `REMOVED`: texto tachado.
- `UPDATED`: destaque sutil.
- `REPLACED`: item antigo tachado e novo item destacado.
- `MOVED`: indicacao de codigo anterior e novo codigo.
- observacao: comentario no Word quando o documento for comparativo.

## Relacao com versionamento

Documento nunca deve consultar apenas o estado atual quando for comparativo. Ele deve receber:

- versao base;
- versao alvo;
- ChangeSets;
- Snapshots;
- filtros empresariais e estaduais.

Cada `ChangeSetItem` usado no documento deve fornecer:

- `documentMarker`;
- `renderHint`;
- `impactLevel`;
- `oldHierarchyCode`;
- `newHierarchyCode`;
- `previousValue`;
- `nextValue`.

## Auditoria

Toda geracao deve registrar:

- quem gerou;
- empresa;
- template e versao;
- filtros usados;
- data/hora;
- resultado;
- referencia do arquivo;
- metadados tecnicos.
