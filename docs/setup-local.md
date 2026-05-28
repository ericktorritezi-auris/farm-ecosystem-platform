# Setup local

## Requisitos

- Node.js LTS
- npm
- PostgreSQL local ou via Docker
- Git instalado e disponivel no PATH para versionamento

## Instalar dependencias

```bash
npm install
```

## Configurar ambiente

```bash
cp .env.example .env
```

No PowerShell, se preferir:

```powershell
Copy-Item .env.example .env
```

Ajuste `DATABASE_URL`, `AUTH_SECRET` e credenciais do usuario master.

## Banco local com Docker

```bash
docker run --name souyess-specs-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=souyess_specs -p 5432:5432 -d postgres:16
```

## Prisma

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

## Rodar aplicacao

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Validacao

```bash
npm run lint
npm run typecheck
npm run build
```
