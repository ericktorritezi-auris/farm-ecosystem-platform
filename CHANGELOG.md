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

### Limitacoes

- Autenticacao funcional ainda nao implementada.
- CRUDs, workflow de aprovacao, dashboard e geracao DOCX ainda nao implementados.
- `git` nao estava disponivel no PATH do ambiente de criacao; a entrega ainda precisa ser versionada oficialmente no GitHub.
