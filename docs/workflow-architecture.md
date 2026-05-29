# Arquitetura de Workflow

## Objetivo

Definir arquitetura futura de aprovacao e governanca sem implementar o fluxo nesta fase.

## Perfis

- Agente.
- Aprovador.
- Lider.
- Administrador.
- Administrador Master.

## Entidades

```text
ApprovalFlow
ApprovalStep
ApprovalRequest
ApprovalDecision
ApprovalHistory
```

## ApprovalFlow

Configuracao por empresa e dominio.

Campos recomendados:

- `companyId`;
- `code`;
- `name`;
- `entityType`;
- `isActive`.

## ApprovalStep

Define etapa:

- ordem;
- papel requerido;
- escopo;
- obrigatoriedade;
- SLA futuro;
- regra de escalonamento futuro.

## ApprovalRequest

Solicitacao de aprovacao:

- empresa;
- entidade;
- versao;
- ChangeSet;
- solicitante;
- status;
- data de abertura.

## ApprovalDecision

Decisao:

- aprovar;
- reprovar;
- solicitar ajuste;
- cancelar;
- escalar.

## ApprovalHistory

Historico imutavel das transicoes.

## Estados recomendados

- `DRAFT`;
- `SUBMITTED`;
- `IN_REVIEW`;
- `APPROVED`;
- `REJECTED`;
- `ADJUSTMENT_REQUESTED`;
- `CANCELLED`;
- `PUBLISHED`.

## Regras por papel

- Agente cria proposta e responde ajustes.
- Aprovador decide dentro do escopo.
- Lider pode decidir, reatribuir e executar importacao final.
- Administrador configura usuarios, permissoes e fluxos.
- Master atua globalmente e deve ser usado com parcimonia.

## Escopo de aprovacao

Pode ser:

- empresa;
- sistema;
- modulo;
- funcionalidade.

## Impacto em outros dominios

Workflow deve ser acionado por:

- edicao relevante;
- substituicao;
- substituicao 1:N, N:1 ou N:N;
- renumeracao hierarquica com impacto documental;
- exclusao logica;
- importacao com impacto;
- alteracao de template documental;
- override de aderencia relevante.

## Substituicao governada

Substituicoes complexas devem passar por workflow quando alterarem conteudo publicado.

O workflow deve aprovar:

- `FunctionalItemReplacementGroup`;
- vinculos `FunctionalItemReplacement`;
- `ChangeSet REPLACE`;
- `ChangeSet REORDER`, quando houver renumeracao;
- snapshots antes/depois.

Nenhum item antigo deve ser apagado fisicamente. Itens antigos devem permanecer disponiveis para auditoria e documento comparativo.

## Auditoria

Cada transicao deve registrar:

- usuario;
- empresa;
- papel;
- etapa;
- decisao;
- comentario;
- data/hora;
- metadados.
