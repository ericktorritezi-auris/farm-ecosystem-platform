# Deploy interno

A aplicacao foi pensada para rede interna. Ha duas rotas recomendadas de deploy: Docker ou Node.js direto no servidor.

## Opcao 1: Docker

Impacto: facilita padronizacao do ambiente, rollback e reproducibilidade. Exige que a infraestrutura interna aceite Docker.

Fluxo sugerido:

```bash
npm install
npm run build
npm run prisma:deploy
npm run prisma:seed
npm run start
```

Em producao, preferir imagem propria com variaveis de ambiente externas e PostgreSQL em servico separado.

## Opcao 2: Node.js direto

Impacto: mais simples em servidores internos tradicionais, mas exige controle manual de Node.js, variaveis, processo e atualizacoes.

Passos sugeridos:

```bash
npm ci
npm run prisma:generate
npm run build
npm run prisma:deploy
npm run start
```

Para manter o processo ativo, usar PM2, servico Windows ou gerenciador equivalente.

## Banco

- PostgreSQL deve ter backup agendado.
- Migrations devem ser aplicadas com `npm run prisma:deploy`.
- Seeds devem ser usadas com cuidado em producao, principalmente apos o primeiro deploy.

## Rollback

- Manter artefato/build anterior.
- Registrar versao publicada.
- Fazer backup antes de migrations.
- Evitar alterar schema em producao sem plano de reversao.
