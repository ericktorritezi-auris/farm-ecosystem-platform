# Estrategia de Substituicao de Particularidades

## Objetivo

Formalizar substituicoes de particularidades/funcoes sem depender de `replacedById`, que so cobre bem cenarios 1:1.

## Entidades

```text
FunctionalItemReplacementGroup
FunctionalItemReplacement
```

## FunctionalItemReplacementGroup

Campos canonicos:

- `id`;
- `companyId`;
- `featureId`;
- `reason`;
- `observation`;
- `createdById`;
- `approvedById`;
- `approvalRequestId`;
- `createdAt`;
- `approvedAt`.

## FunctionalItemReplacement

Campos canonicos:

- `id`;
- `replacementGroupId`;
- `sourceFunctionalItemId`;
- `targetFunctionalItemId`;
- `sourceVersionId`;
- `targetVersionId`;
- `sourceHierarchyCode`;
- `targetHierarchyCode`;
- `replacementType`;
- `createdAt`.

## Cenarios suportados

### 1 item antigo para 1 item novo

```text
B -> X
replacementType = ONE_TO_ONE
```

### 1 item antigo para varios itens novos

```text
B -> X
B -> Y
B -> Z
replacementType = ONE_TO_MANY
```

### Varios itens antigos para 1 item novo

```text
B -> X
C -> X
replacementType = MANY_TO_ONE
```

### Varios itens antigos para varios itens novos

```text
B -> X
B -> Y
C -> X
C -> Y
replacementType = MANY_TO_MANY
```

### Item excluido sem substituicao

```text
B -> sem destino
replacementType = REMOVED_WITHOUT_REPLACEMENT
```

## Regras

- item antigo nunca deve ser apagado fisicamente;
- item antigo deve manter snapshot e versao historica;
- item novo deve ter versao propria;
- grupo de substituicao deve passar por aprovacao quando impactar documento publicado;
- substituicao pode gerar renumeracao;
- documento comparativo deve mostrar origem e destino.

## Relacao com renumeracao

Substituicao 1:N pode empurrar itens posteriores.

Substituicao N:1 pode puxar itens posteriores.

Toda alteracao posicional decorrente de substituicao deve gerar `ChangeSet REORDER`.

## Relacao com documentos comparativos

Item antigo:

- `documentMarker = REPLACED` ou `REMOVED`;
- renderizacao futura: tachado.

Item novo:

- `documentMarker = INSERTED` ou `REPLACED`;
- renderizacao futura: destaque.

Itens movidos por efeito colateral:

- `documentMarker = MOVED`;
- renderizacao futura: indicar codigo anterior e novo codigo.
