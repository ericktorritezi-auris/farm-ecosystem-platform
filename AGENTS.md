# AGENTS.md

## Diretrizes do projeto

Este repositorio e a base da plataforma interna modular do Departamento Farm / Negocios / Atendimento Especializado do Grupo Souyess.

Antes de alterar codigo existente:

1. entender a solicitacao;
2. mapear arquivos impactados;
3. explicar impacto tecnico;
4. informar riscos;
5. propor plano de alteracao;
6. aguardar autorizacao quando a mudanca for sensivel;
7. implementar;
8. testar;
9. informar o que foi alterado;
10. sugerir proximo passo.

## Principios

- preservar modularidade entre `core`, `modules` e `shared`;
- evitar regras de permissao rigidas espalhadas pela UI;
- manter versionamento e auditoria como preocupacoes centrais;
- documentar decisoes de infraestrutura;
- nao misturar futuros modulos com o modulo de especificacoes.

## Qualidade

Sempre que possivel, executar:

```bash
npm run lint
npm run typecheck
npm run build
```

Para alteracoes de banco:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```
