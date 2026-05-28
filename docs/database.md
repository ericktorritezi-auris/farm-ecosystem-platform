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
- `FunctionalItemState`
- `FunctionalItemVersion`
- `BrazilianState`
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

Regras estruturais:

- uma particularidade pode estar vinculada a multiplos estados;
- `FunctionalItemState` evita duplicidade por `functionalItemId` + `stateId`;
- `GENERAL` nao exige estados vinculados;
- `STATE_SPECIFIC` deve ter ao menos um estado vinculado, regra que sera validada na camada de servico quando os fluxos funcionais forem implementados.

`FunctionalItemVersion.scopeSnapshot` deve preservar a abrangencia estadual no momento da versao, por exemplo:

```json
{
  "scopeType": "STATE_SPECIFIC",
  "states": [
    { "code": "MG", "name": "Minas Gerais", "region": "Sudeste" }
  ]
}
```

## Contrato documental futuro

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

## Versionamento

Padrao inicial: `AAAA.N`, por exemplo `2026.1`.

O campo `version` guarda a representacao textual. Os campos `year` e `sequence` facilitam ordenacao e geracao da proxima versao.

## Auditoria

`AuditLog` registra entidade, acao, usuario, valores anteriores, novos valores, resultado, IP e metadados tecnicos quando disponiveis.

Logs nao devem ser apagados por usuarios comuns.
