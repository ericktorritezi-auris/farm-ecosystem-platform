# Arquitetura

## Visao geral

A plataforma nasce como um ecossistema interno modular. O primeiro modulo e a Gestao de Especificacoes Funcionais, mas a organizacao do repositorio ja separa recursos transversais e dominios de negocio.

## Camadas

- `app`: rotas e telas Next.js.
- `src/core`: capacidades transversais da plataforma.
- `src/modules`: modulos de negocio.
- `src/shared`: UI, banco, utilitarios, validacoes e tipos compartilhados.
- `prisma`: schema, migrations e seed.
- `docs`: documentacao operacional e arquitetural.

## Dominios transversais

- `core/auth`: autenticacao e sessoes.
- `core/users`: usuarios, agentes e aprovadores.
- `core/permissions`: RBAC, permissoes e escopos.
- `core/audit`: logs e rastreabilidade.
- `core/settings`: parametros globais.

## Modulo inicial

`modules/specifications` concentra:

- sistemas;
- modulos;
- funcionalidades;
- particularidades/funcoes;
- abrangencia estadual das particularidades/funcoes;
- aprovacoes;
- documentos;
- dashboard.

## Abrangencia estadual

O dominio de especificacoes suporta particularidades/funcoes gerais ou especificas por UF.

Modelagem:

- `FunctionalItem.scopeType`: define `GENERAL` ou `STATE_SPECIFIC`.
- `BrazilianState`: cadastro parametrizado das 27 UFs brasileiras.
- `FunctionalItemState`: relacionamento entre particularidade/funcao e uma ou mais UFs.
- `FunctionalItemVersion.scopeSnapshot`: snapshot historico da abrangencia no momento da versao.

Essa modelagem prepara filtros, consultas, governanca e geracao documental futura sem usar campo texto livre.

Regra documental futura:

- sem filtro por estado: listar todos os itens, sinalizando itens especificos por UF;
- com filtro por estado: listar itens gerais e itens especificos da UF filtrada.

## Decisao de arquitetura

O backend e frontend ficam no mesmo projeto Next.js no MVP. Isso reduz custo operacional inicial e facilita evolucao local/interna. A separacao por dominios evita acoplamento excessivo e permite extrair servicos no futuro, se necessario.
