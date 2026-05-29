# Arquitetura de Importacao Massiva

## Objetivo

Preparar importacao massiva por Excel sem implementar upload nesta fase.

## Pipeline

```text
Template Excel -> Upload futuro -> ImportBatch -> Preview -> Validacao -> Execucao -> Auditoria -> Rollback logico
```

## Entidades

```text
ImportBatch
ImportBatchRow
ImportValidation
ImportExecution
```

## ImportBatch

Representa um lote por empresa.

Campos recomendados:

- `companyId`;
- `sourceFileName`;
- `templateVersion`;
- `status`;
- `requestedById`;
- `createdAt`;
- `validatedAt`;
- `executedAt`.

Status recomendados:

- `UPLOADED`;
- `VALIDATING`;
- `VALIDATED`;
- `VALIDATION_FAILED`;
- `READY_TO_EXECUTE`;
- `EXECUTING`;
- `EXECUTED`;
- `PARTIALLY_EXECUTED`;
- `ROLLED_BACK`;
- `FAILED`.

## ImportBatchRow

Representa uma linha do arquivo.

Campos recomendados:

- `batchId`;
- `rowNumber`;
- `rawData`;
- `normalizedData`;
- `targetEntity`;
- `operation`;
- `status`;
- `errorSummary`.

## ImportValidation

Armazena validacoes:

- campos obrigatorios;
- hierarquia;
- empresa;
- sistema;
- modulo;
- funcionalidade;
- estado/UF;
- duplicidade;
- permissao;
- impacto de versionamento.

## ImportExecution

Representa execucao efetiva:

- linhas processadas;
- entidades criadas;
- entidades alteradas;
- entidades ignoradas;
- ChangeSets gerados;
- snapshots;
- logs;
- status final.

## Template Excel

Colunas conceituais:

- empresa;
- sistema_codigo;
- sistema_nome;
- modulo_nome;
- funcionalidade_nome;
- particularidade_titulo;
- descricao;
- natureza;
- status;
- exigivel_poc;
- scope_type;
- estados;
- parecer;
- observacoes.

`estados` deve aceitar codigos parametrizados, por exemplo `MG;SP;RS`, nunca nomes livres como fonte de verdade.

## Rollback logico

Rollback nao deve apagar auditoria. Deve:

- marcar entidades criadas como logicamente removidas;
- restaurar snapshots quando aplicavel;
- gerar ChangeSet de rollback;
- registrar `ImportExecution` de reversao.

## Permissoes

- Agente pode preparar e validar importacao.
- Lider/Admin pode executar importacao final.
- Aprovador pode revisar impacto quando regra exigir workflow.

## Auditoria

Auditar:

- arquivo;
- hash futuro do arquivo;
- usuario;
- empresa;
- validacoes;
- erros;
- execucao;
- rollback;
- linhas impactadas.
