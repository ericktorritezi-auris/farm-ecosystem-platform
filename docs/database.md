# Banco de dados

## Banco recomendado

PostgreSQL.

## Entidades v0.2.0

- `Company`
- `User`
- `Role`
- `Permission`
- `UserRole`
- `CompanyUserRole`
- `RolePermission`
- `ApprovalScope`
- `AuditLog`
- `System`
- `SystemModule`
- `Feature`
- `FunctionalItem`
- `FunctionalItemState`
- `BrazilianState`
- `Version`
- `Snapshot`
- `ChangeSet`
- `ChangeSetItem`
- `ApprovalRequest`
- `ApprovalDecision`
- `Nature`
- `ItemStatus`
- `OpinionType`
- `DocumentGenerationLog`

## Multiempresa

`Company` e o tenant principal da plataforma.

Estrutura operacional:

```text
Company -> System -> SystemModule -> Feature -> FunctionalItem
```

`System`, `SystemModule`, `Feature` e `FunctionalItem` possuem `companyId` direto. Em `FunctionalItem`, os campos `companyId`, `systemId`, `moduleId` e `featureId` sao contexto denormalizado para filtros, auditoria, seguranca e documentos.

A fonte oficial da hierarquia e:

```text
Feature -> SystemModule -> System -> Company
```

Services de dominio devem resolver os campos denormalizados a partir de `featureId`, nunca confiar em valores livres informados pela interface.

## Papeis por empresa

`CompanyUserRole` representa:

```text
User + Company + Role
```

Regra v0.2.0:

- um usuario possui apenas um papel ativo por empresa;
- a constraint `userId + companyId` evita dois papeis simultaneos na mesma empresa;
- o papel global legado em `UserRole` permanece apenas para compatibilidade da foundation inicial.

## Hierarquia funcional

```text
System -> SystemModule -> Feature -> FunctionalItem
```

`FunctionalItem` representa a particularidade/funcao atual, com:

- `hierarchyCode`;
- `position`;
- `isDeleted`;
- `deletedAt`;
- `deletedById`;
- `deletedReason`.

`hierarchyCode` e `position` devem ser controlados pelo `HierarchyRenumberingService`.

## Abrangencia estadual

Cada `FunctionalItem` possui `scopeType`:

- `GENERAL`: particularidade/funcao aplicavel a todos os estados.
- `STATE_SPECIFIC`: particularidade/funcao aplicavel a uma ou mais UFs.

Estados brasileiros ficam parametrizados em `BrazilianState`, com:

- `code`: UF, por exemplo `MG`, `SP`, `RS`.
- `name`: nome completo do estado.
- `region`: regiao brasileira, quando aplicavel.
- `isActive`: controla disponibilidade para uso futuro em filtros e cadastros.

O relacionamento entre particularidades e estados e feito por `FunctionalItemState`.

## Versionamento canonico

`FunctionalItemVersion` foi removida na v0.2.0.

O versionamento oficial passa a ser:

```text
Version -> Snapshot
Version -> ChangeSet -> ChangeSetItem
```

`Version` registra o marco versionado. `Snapshot` preserva o estado completo. `ChangeSet` representa a operacao governada. `ChangeSetItem` guarda alteracoes campo a campo, incluindo marcadores documentais.

Entidades versionadas usam `VersionedEntityType`, incluindo:

- `SYSTEM`;
- `MODULE`;
- `FEATURE`;
- `FUNCTIONAL_ITEM`;
- `DOCUMENT_TEMPLATE`;
- `ADHERENCE_ANALYSIS`.

## Contrato documental futuro por estado

Filtro de documentacao por estado:

Entrada:

- `stateCode` opcional.

Comportamento sem `stateCode`:

- retorna todas as particularidades/funcoes;
- itens `GENERAL` aparecem normalmente;
- itens `STATE_SPECIFIC` aparecem sinalizados com suas UFs, por exemplo `Especifico para MG / Minas Gerais`.

Comportamento com `stateCode`:

- retorna itens `GENERAL`;
- retorna itens `STATE_SPECIFIC` vinculados ao estado informado;
- exclui itens `STATE_SPECIFIC` vinculados apenas a outros estados.

## Auditoria

`AuditLog` registra entidade, acao, usuario, valores anteriores, novos valores, resultado, IP e metadados tecnicos quando disponiveis.

Logs nao devem ser apagados por usuarios comuns.
