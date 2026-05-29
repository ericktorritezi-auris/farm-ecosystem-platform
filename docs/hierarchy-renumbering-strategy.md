# Estrategia de Renumeracao Hierarquica

## Objetivo

Formalizar o `HierarchyRenumberingService`, responsavel por gerar, mover, inserir, excluir logicamente, substituir e renumerar itens hierarquicos sem perda historica.

## Escopo

Aplica-se a:

- `SystemModule`;
- `Feature`;
- `FunctionalItem`.

Sistema possui codigo livre e nao deve ser renumerado automaticamente sem decisao administrativa explicita.

## Campos governados

- `position`;
- `hierarchyCode`;
- `isDeleted`;
- `deletedAt`;
- `deletedById`;
- `deletedReason`;
- relacoes de substituicao.

## Responsabilidades

- gerar proximo codigo;
- inserir item em posicao especifica;
- excluir item logicamente;
- substituir item;
- mover item;
- empurrar itens posteriores;
- puxar itens posteriores quando exclusao nao tem substituicao;
- preservar historico;
- registrar `ChangeSet REORDER`;
- registrar `ChangeSetItem` para cada item impactado.

## Insercao simples

Se inserir novo item no final:

- calcula proximo `position`;
- gera proximo `hierarchyCode`;
- cria `ChangeSet CREATE`;
- cria snapshot inicial;
- nao altera itens anteriores.

Exemplo:

```text
Antes:
1.1.1.1
1.1.1.2

Inserir no final:
1.1.1.3
```

## Insercao em posicao especifica

Se inserir em uma posicao ocupada:

- novo item ocupa a posicao solicitada;
- itens posteriores sao empurrados;
- todos os itens impactados recebem novo `position` e novo `hierarchyCode`;
- gera `ChangeSet CREATE` para o novo item;
- gera `ChangeSet REORDER` para os itens empurrados.

Exemplo:

```text
Antes:
1.1.1.1 A
1.1.1.2 B
1.1.1.3 C

Inserir X na posicao 2:
1.1.1.1 A
1.1.1.2 X
1.1.1.3 B
1.1.1.4 C
```

## Exclusao sem substituicao

Se remover `1.1.1.2` sem substituicao:

- marcar item removido como `isDeleted = true`;
- preencher `deletedAt`, `deletedById`, `deletedReason`;
- recalcular posicoes ativas posteriores;
- `1.1.1.3` vira `1.1.1.2`;
- registrar `ChangeSet LOGICAL_DELETE`;
- registrar `ChangeSet REORDER`.

Exemplo:

```text
Antes:
1.1.1.1 A
1.1.1.2 B
1.1.1.3 C

Excluir B:
1.1.1.1 A
1.1.1.2 C

Historico:
B permanece como removido, com oldHierarchyCode = 1.1.1.2.
```

## Exclusao com substituicao 1:N

Se remover `1.1.1.2` e inserir tres novos itens:

- item original vira removido/substituido;
- novos itens ocupam `1.1.1.2`, `1.1.1.3`, `1.1.1.4`;
- itens posteriores sao empurrados;
- criar `FunctionalItemReplacementGroup`;
- criar vinculos `FunctionalItemReplacement`;
- registrar `ChangeSet REPLACE`;
- registrar `ChangeSet REORDER`.

Exemplo:

```text
Antes:
1.1.1.1 A
1.1.1.2 B
1.1.1.3 C

Substituir B por X, Y, Z:
1.1.1.1 A
1.1.1.2 X
1.1.1.3 Y
1.1.1.4 Z
1.1.1.5 C

Historico:
B -> X
B -> Y
B -> Z
C: oldHierarchyCode = 1.1.1.3, newHierarchyCode = 1.1.1.5
```

## Reordenacao

Toda alteracao de posicao deve preservar:

- codigo anterior;
- codigo novo;
- posicao anterior;
- posicao nova;
- usuario;
- motivo;
- data/hora.

Cada item impactado deve gerar `ChangeSetItem` com:

- `oldPosition`;
- `newPosition`;
- `oldHierarchyCode`;
- `newHierarchyCode`;
- `documentMarker = MOVED`;
- `renderHint`.

## Concorrencia

Reordenacoes devem ser transacionais por grupo de irmaos. Duas renumeracoes simultaneas no mesmo `featureId` nao podem ser aplicadas sem controle de concorrencia.

## Auditoria

Toda renumeracao deve registrar:

- empresa;
- entidade raiz;
- grupo de irmaos afetado;
- usuario;
- motivo;
- ChangeSet;
- snapshots antes/depois.
