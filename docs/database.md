# Banco de dados

## Banco recomendado

PostgreSQL.

## Entidades iniciais

- `User`
- `Role`
- `Permission`
- `UserRole`
- `RolePermission`
- `ApprovalScope`
- `AuditLog`
- `System`
- `SystemModule`
- `Feature`
- `FunctionalItem`
- `FunctionalItemVersion`
- `ApprovalRequest`
- `ApprovalDecision`
- `Nature`
- `ItemStatus`
- `OpinionType`
- `DocumentGenerationLog`

## Hierarquia funcional

```text
System -> SystemModule -> Feature -> FunctionalItem -> FunctionalItemVersion
```

A `FunctionalItem` representa o estado atual da particularidade/funcao. A `FunctionalItemVersion` preserva historico, valores anteriores, novos valores, parecer, agente, data/hora e status de aprovacao.

## Versionamento

Padrao inicial: `AAAA.N`, por exemplo `2026.1`.

O campo `version` guarda a representacao textual. Os campos `year` e `sequence` facilitam ordenacao e geracao da proxima versao.

## Auditoria

`AuditLog` registra entidade, acao, usuario, valores anteriores, novos valores, resultado, IP e metadados tecnicos quando disponiveis.

Logs nao devem ser apagados por usuarios comuns.
