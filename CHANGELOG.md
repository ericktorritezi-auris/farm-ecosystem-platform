# Changelog

Todas as alteracoes relevantes deste projeto devem ser registradas neste arquivo.

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
