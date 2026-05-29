# Changelog

Todas as alteracoes relevantes deste projeto devem ser registradas neste arquivo.

## v0.1.4 - Governance hardening de versionamento, hierarquia e comparativo

### Adicionado

- Campos canonicos de `FunctionalItem`, `Version`, `Snapshot`, `ChangeSet` e `ChangeSetItem`.
- Conceito `FunctionalItemReplacementGroup` para agrupar substituicoes governadas.
- Conceito `FunctionalItemReplacement` para suportar substituicoes 1:1, 1:N, N:1, N:N e remocao sem substituicao.
- Documento `docs/hierarchy-renumbering-strategy.md` com regras de insercao, exclusao, substituicao e reordenacao.
- Documento `docs/replacement-strategy.md` com estrategia formal de substituicao de particularidades.
- Documento `docs/document-diff-contract.md` com contrato `DocumentDiffMarker`.
- Regras de renderizacao futura para comparativos documentais: inserido, atualizado, removido, substituido e movido.

### Atualizado

- `docs/domain-model.md` com campos canonicos de `FunctionalItem` e entidades de substituicao.
- `docs/versioning-strategy.md` com campos canonicos de `Version`, `Snapshot`, `ChangeSet` e `ChangeSetItem`.
- `docs/document-architecture.md` com `DocumentDiffMarker` e consumo de `ChangeSetItem`.
- `docs/governance-engine.md` com `ReplacementService`, `HierarchyRenumberingService` e eventos de dominio relacionados.
- `docs/workflow-architecture.md` com aprovacao de substituicoes complexas e renumeracoes com impacto documental.
- `docs/architecture.md` com referencias aos novos contratos oficiais.

### Observacoes

- Esta entrega e exclusivamente documental.
- Nao houve alteracao de Prisma schema, migrations, telas, CRUDs, APIs, autenticacao, design system, DOCX/PDF ou IA.

## v0.1.3 - Consolidacao arquitetural de dominio e governanca

### Adicionado

- Consolidacao da arquitetura alvo multiempresa para o Core Governance Engine.
- Documento `docs/domain-model.md` com mapa de entidades, relacionamentos, hierarquia funcional e invariantes de dominio.
- Documento `docs/governance-engine.md` com responsabilidades, componentes conceituais, eventos e recomendacao para v0.2.0.
- Documento `docs/permissions-matrix.md` com papeis por empresa, matriz de permissoes e escopos.
- Documento `docs/document-architecture.md` com dominio documental, templates, geracoes e comparativo.
- Documento `docs/adherence-engine.md` com arquitetura futura de aderencia cognitiva sem integracao de IA.
- Documento `docs/import-architecture.md` com pipeline de importacao massiva, validacao, execucao e rollback logico.
- Documento `docs/versioning-strategy.md` com Version, Snapshot, ChangeSet e ApprovalHistory.
- Documento `docs/workflow-architecture.md` com arquitetura de aprovacao e estados futuros.

### Atualizado

- `docs/architecture.md` passa a refletir multiempresa, papeis por empresa, versionamento central, documentos, importacao, aderencia e auditoria como dominios estruturais.

### Observacoes

- Esta entrega e exclusivamente arquitetural.
- Nao foram criados schemas, migrations, telas, CRUDs, APIs, autenticacao, IA, DOCX, PDF, integracoes ou automacoes.

## v0.1.2 - Inclusao estrutural de abrangencia estadual para particularidades funcionais

### Adicionado

- Enum `FunctionalItemScopeType` com `GENERAL` e `STATE_SPECIFIC`.
- Entidade `BrazilianState` para parametrizar os 26 estados brasileiros e o Distrito Federal.
- Entidade `FunctionalItemState` para vincular particularidades/funcoes a uma ou mais UFs.
- Campo `FunctionalItem.scopeType` para indicar abrangencia geral ou especifica.
- Campo `FunctionalItemVersion.scopeSnapshot` para preservar snapshot historico da abrangencia estadual.
- Seed inicial das 27 UFs brasileiras.
- Contrato TypeScript `state-scope.ts` para filtros documentais futuros por estado.
- Documentacao da regra futura de geracao documental com `stateCode` opcional.

### Observacoes

- A regra `STATE_SPECIFIC` deve exigir ao menos uma UF na camada de servico quando os fluxos funcionais forem implementados.
- Nao foram criados CRUD, telas, APIs, autenticacao ou geracao documental nesta entrega.

## v0.1.0 - Estrutura inicial

### Adicionado

- Scaffold inicial com Next.js, TypeScript, Tailwind CSS e Prisma.
- Estrutura modular com `core`, `modules/specifications` e `shared`.
- Pagina inicial simples da plataforma interna e do modulo Gestao de Especificacoes Funcionais.
- Configuracao base de tema claro/escuro por variaveis CSS.
- Schema inicial PostgreSQL/Prisma para usuarios, RBAC, auditoria, cadastros, especificacoes, versoes, aprovacoes e logs documentais.
- Seed inicial com usuario master, perfis, permissoes, naturezas, status e pareceres.
- Documentacao inicial: README, AGENTS, arquitetura, setup local, deploy interno e banco de dados.
- SpecGov Design System v2.0 como foundation architecture da interface.
- Tokens oficiais SpecGov em CSS variables, Tailwind e contrato TypeScript.
- Tipografia com Geist, Inter e IBM Plex Mono.
- App shell enterprise com sidebar de 240px, topbar de 48px, breadcrumbs e navegacao mobile.
- Biblioteca base de componentes: Button, Input, Select, Textarea, Card, KPI Card, Badge, Alert, Table, Nav Item, Stepper, Modal, Tabs, Search Input, Empty State e Status Indicators.
- Scaffolds de paginas: dashboard, especificacoes, aprovacoes, rastreabilidade, compliance, documentacao e settings.
- Documentacao `docs/design-system.md`.

### Refinado

- Grid arquitetural de fundo reduzido para textura quase invisivel.
- Hierarquia da sidebar com itens inativos mais silenciosos e estado ativo mais preciso.
- Tipografia, line-height, letter spacing e pesos visuais ajustados para maturidade enterprise.
- Botao primario com densidade, padding, sombra e estados hover/active mais institucionais.
- Tabelas com header navy suavizado, linhas mais legiveis, divisores discretos e hover menos dominante.
- Cards, badges, alerts, tabs, stepper, modal e formularios harmonizados em densidade e estados.
- `docs/design-system.md` ampliado com contratos de layout, densidade, tabelas, formularios, modais, responsividade e composicao.

### Limitacoes

- Autenticacao funcional ainda nao implementada.
- CRUDs, workflow de aprovacao, dashboard e geracao DOCX ainda nao implementados.
- `git` nao estava disponivel no PATH do ambiente de criacao; a entrega ainda precisa ser versionada oficialmente no GitHub.
