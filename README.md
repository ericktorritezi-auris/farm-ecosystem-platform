# Plataforma Interna Souyess - Especificacoes Funcionais

Fundacao inicial da plataforma modular interna do Departamento Farm / Negocios / Atendimento Especializado do Grupo Souyess.

O primeiro modulo previsto e a **Gestao de Especificacoes Funcionais**, voltado a cadastrar, versionar, auditar, aprovar e gerar documentacao das especificacoes dos sistemas tributarios municipais.

## Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS
- Radix/shadcn-style components
- Auth.js/NextAuth preparado para sessao segura com cookie httpOnly
- SpecGov Design System v2.0

## Escopo da v0.1.0

- Scaffold inicial do projeto.
- Estrutura modular de pastas.
- Configuracao base de TypeScript, ESLint, Tailwind e Prisma.
- Schema inicial do banco.
- Seed inicial com usuario master, perfis, permissoes, naturezas, status e pareceres.
- Documentacao inicial de arquitetura, setup local, deploy interno e banco.
- Foundation architecture visual com tokens, componentes e app shell SpecGov.

Ainda nao ha autenticacao funcional, CRUDs, workflow completo, dashboard operacional ou geracao DOCX implementada.

## Limitacao registrada

No ambiente usado para criar esta fundacao, o comando `git` nao estava disponivel no PATH. Portanto, esta entrega ainda nao deve ser considerada oficialmente versionada no GitHub ate que os arquivos sejam adicionados e commitados em uma maquina com Git configurado.

## Inicio rapido

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

A aplicacao devera abrir em `http://localhost:3000`.
