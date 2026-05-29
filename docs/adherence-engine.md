# Adherence Analysis Engine

## Objetivo

Preparar a arquitetura para futura analise cognitiva de aderencia entre termos de referencia, editais, requisitos externos e as especificacoes funcionais do SpecGov.

Nao ha integracao com IA nesta fase.

## Fluxo futuro

```text
TR -> processamento -> comparacao -> aderencia -> revisao humana -> auditoria
```

## Entidades

```text
AdherenceAnalysis
AdherenceAnalysisItem
AdherenceFinding
AdherenceDecision
AdherenceOverride
AdherenceEvidence
```

## AdherenceAnalysis

Representa uma analise por empresa.

Campos recomendados:

- `companyId`;
- `sourceType`;
- `sourceReference`;
- `status`;
- `requestedById`;
- `reviewedById`;
- `createdAt`;
- `completedAt`.

## AdherenceAnalysisItem

Representa um requisito ou trecho analisado.

Campos recomendados:

- `analysisId`;
- `externalCode`;
- `description`;
- `normalizedText`;
- `stateCode`, quando aplicavel;
- `status`.

## AdherenceFinding

Achado produzido pelo motor de comparacao.

Tipos recomendados:

- `MATCH`;
- `PARTIAL_MATCH`;
- `GAP`;
- `CONFLICT`;
- `AMBIGUOUS`;

Campos recomendados:

- `analysisItemId`;
- `functionalItemId`;
- `confidence`;
- `rationale`;
- `evidenceSummary`;
- `status`.

## AdherenceDecision

Decisao humana ou sistemica sobre um finding.

Decisoes recomendadas:

- `ACCEPTED`;
- `REJECTED`;
- `NEEDS_REVIEW`;
- `OVERRIDDEN`.

## AdherenceOverride

Permite que aprovador, lider ou administrador ajuste uma conclusao.

Campos recomendados:

- `decisionId`;
- `overriddenById`;
- `reason`;
- `previousValue`;
- `newValue`;
- `createdAt`.

## AdherenceEvidence

Guarda evidencias:

- trecho do TR;
- referencia documental;
- particularidade relacionada;
- versao utilizada;
- score;
- metadados.

## Impacto da abrangencia estadual

Analise filtrada por estado deve:

- considerar itens `GENERAL`;
- considerar itens `STATE_SPECIFIC` da UF;
- ignorar itens especificos de outras UFs;
- registrar no snapshot qual filtro estadual foi usado.

## Governanca humana

Nenhum resultado cognitivo deve publicar alteracao automaticamente. Aderencia pode sugerir, classificar e evidenciar, mas decisoes de governanca devem passar por revisao humana quando houver impacto documental ou funcional.

## Auditoria

Auditar:

- fonte analisada;
- versoes usadas;
- filtros;
- parametros;
- findings;
- decisoes;
- overrides;
- usuario revisor;
- data/hora.
