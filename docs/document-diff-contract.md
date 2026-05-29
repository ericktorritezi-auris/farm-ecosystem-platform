# Contrato de Diff Documental

## Objetivo

Formalizar os marcadores que documentos comparativos devem consumir a partir de `ChangeSetItem`.

## DocumentDiffMarker

```text
NONE
INSERTED
UPDATED
REMOVED
REPLACED
MOVED
```

## Regras de renderizacao futura

- `NONE`: renderizacao normal.
- `INSERTED`: destaque amarelo.
- `UPDATED`: destaque sutil.
- `REMOVED`: texto tachado.
- `REPLACED`: item antigo tachado e novo item destacado.
- `MOVED`: indicacao de codigo anterior e novo codigo.

Observacoes devem ser renderizadas como comentario no Word quando o documento for comparativo.

## Campos consumidos

Cada `ChangeSetItem` usado em documento comparativo deve expor:

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

## Exemplos

### Inserido

```json
{
  "documentMarker": "INSERTED",
  "fieldPath": "functionalItem",
  "previousValue": null,
  "nextValue": "Nova particularidade",
  "renderHint": "highlight-yellow"
}
```

### Removido

```json
{
  "documentMarker": "REMOVED",
  "fieldPath": "functionalItem",
  "previousValue": "Particularidade removida",
  "nextValue": null,
  "renderHint": "strikethrough"
}
```

### Movido

```json
{
  "documentMarker": "MOVED",
  "fieldPath": "hierarchyCode",
  "oldHierarchyCode": "1.1.1.3",
  "newHierarchyCode": "1.1.1.5",
  "oldPosition": 3,
  "newPosition": 5,
  "renderHint": "show-old-new-code"
}
```

### Substituido 1:N

```json
{
  "documentMarker": "REPLACED",
  "fieldPath": "replacementGroup",
  "previousValue": "1.1.1.2 B",
  "nextValue": ["1.1.1.2 X", "1.1.1.3 Y", "1.1.1.4 Z"],
  "renderHint": "strike-source-highlight-targets"
}
```

## Principio

Documento comparativo nao deve recalcular diferencas por texto livre. Ele deve consumir `ChangeSet`, `ChangeSetItem`, `Snapshot` e o contrato `DocumentDiffMarker`.
