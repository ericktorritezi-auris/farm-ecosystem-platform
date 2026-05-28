# AGENTS.md

## Papel do Codex neste projeto

Atue como arquiteto técnico e engenheiro sênior responsável por desenvolver uma plataforma interna modular do Departamento Farm / Negócios / Atendimento Especializado do Grupo Souyess.

Este projeto não é um sistema isolado. Ele é o primeiro módulo de um futuro ecossistema interno de aplicações.

O primeiro módulo será: Gestão de Especificações Funcionais.

## Regra principal

Antes de alterar código existente:

1. explique o que entendeu;
2. liste arquivos impactados;
3. descreva riscos;
4. proponha plano de alteração;
5. aguarde autorização se a mudança for estrutural;
6. implemente somente após confirmação;
7. rode validações possíveis;
8. informe o que foi alterado.

Nunca faça refatorações amplas sem autorização.

## Visão da plataforma

A plataforma deve nascer modular, preparada para receber novos módulos no futuro.

Estrutura conceitual:

- Hub/Landing do ecossistema Farm;
- autenticação central;
- permissões reutilizáveis;
- layout compartilhado;
- design system reaproveitável;
- módulos internos independentes;
- banco PostgreSQL;
- deploy em ambiente interno da empresa.

## Módulo inicial

O módulo inicial é Gestão de Especificações Funcionais.

Objetivo: cadastrar, editar, versionar, auditar, aprovar e gerar documentação das especificações funcionais dos sistemas tributários municipais do Grupo Souyess.

Hierarquia de negócio:

Sistema → Módulo → Funcionalidade → Particularidade/Função

A Particularidade/Função é a unidade principal da especificação.

## Entidades principais

Criar arquitetura preparada para:

- Sistemas;
- Módulos;
- Funcionalidades;
- Particularidades/Funções;
- Naturezas;
- Status;
- Agentes;
- Perfis;
- Permissões;
- Pareceres;
- Aprovações;
- Versionamento;
- Logs;
- Documentos gerados;
- Configurações.

## Valores iniciais

Naturezas:

- Básica;
- Diferencial;
- Inovadora.

Status:

- Concluído;
- Em desenvolvimento;
- A desenvolver;
- Sem projeto.

Pareceres iniciais:

- Incluir;
- Manter;
- Melhorar;
- Retirar;
- Substituir.

## Autenticação e autorização

Deve existir conta master inicial.

Perfis mínimos:

- administrador master;
- administrador;
- agente cadastrador/editor;
- agente aprovador;
- usuário de consulta futuro.

Usar arquitetura compatível com RBAC.

Permissões devem controlar:

- criar;
- editar;
- excluir;
- aprovar;
- reprovar;
- consultar;
- gerar documentos;
- administrar cadastros;
- administrar usuários.

## Versionamento funcional

Toda alteração relevante em Particularidade/Função deve gerar nova versão.

Padrão:

AAAA.N

Exemplo:

2026.1  
2026.2

Nunca sobrescrever histórico aprovado sem manter rastreabilidade.

Registrar:

- versão anterior;
- nova versão;
- agente;
- data/hora;
- parecer;
- status de aprovação;
- campos alterados.

## Workflow de aprovação

Alterações relevantes devem ir para fila de aprovação.

O aprovador deve conseguir:

- ver pendências;
- comparar antes/depois;
- aprovar;
- reprovar;
- solicitar ajuste;
- registrar parecer.

A aprovação pode ser limitada por sistema, módulo ou funcionalidade.

## Auditoria

Toda ação relevante deve gerar log.

Registrar:

- usuário;
- ação;
- data/hora;
- entidade afetada;
- valor anterior;
- valor novo;
- resultado;
- metadados técnicos quando viável.

Logs não devem ser apagados por usuários comuns.

## Dashboard

Criar dashboard com:

- total de sistemas;
- total de módulos;
- total de funcionalidades;
- total de particularidades;
- alterações no dia;
- alterações na semana;
- alterações no mês;
- pendências de aprovação;
- alterações por módulo;
- evolução das especificações.

## Documentos

Preparar geração futura de:

- especificação funcional completa;
- especificação por sistema/módulo/funcionalidade;
- documento de itens exigíveis em POC;
- minuta técnica futura.

Formatos desejados:

- PDF;
- DOCX.

## UX/UI

Requisitos:

- mobile first;
- responsivo;
- tema claro/escuro;
- espaço para logo;
- landing inicial simples;
- hub do ecossistema;
- painel administrativo;
- componentes reutilizáveis;
- visual institucional;
- variáveis de tema para troca futura de identidade visual.

## Organização recomendada

Organizar por domínios:

- core/auth;
- core/users;
- core/permissions;
- core/audit;
- core/settings;
- modules/specifications;
- modules/specifications/systems;
- modules/specifications/modules;
- modules/specifications/features;
- modules/specifications/functional-items;
- modules/specifications/approvals;
- modules/specifications/documents;
- shared/ui;
- shared/utils;
- shared/database.

## Banco de dados

Banco preferencial: PostgreSQL.

Usar migrations versionadas.

Criar seeds iniciais para:

- usuário master;
- naturezas;
- status;
- pareceres;
- permissões básicas;
- perfis básicos.

## Documentação obrigatória

Manter:

- README.md;
- AGENTS.md;
- CHANGELOG.md;
- docs/architecture.md;
- docs/setup-local.md;
- docs/deploy-interno.md;
- docs/database.md.

## Qualidade

Antes de concluir tarefa, sempre que possível executar:

- lint;
- build;
- testes;
- validação de tipos;
- checagem básica de regressão.

Se não conseguir executar algo, informar claramente.

## Padrão de resposta do Codex

Ao responder uma tarefa, usar este formato:

### Entendimento
Resumo objetivo do pedido.

### Impacto
Arquivos, módulos e banco impactados.

### Plano
Passos propostos.

### Riscos
Possíveis quebras ou decisões pendentes.

### Execução
O que foi feito.

### Validação
Testes/comandos executados.

### Próximo passo
Recomendação objetiva.

## Versionamento do projeto

Usar versionamento semântico.

Sugestão inicial:

- v0.1.0 — estrutura inicial;
- v0.2.0 — autenticação;
- v0.3.0 — cadastros base;
- v0.4.0 — versionamento funcional;
- v0.5.0 — aprovação;
- v0.6.0 — dashboard;
- v0.7.0 — geração documental;
- v1.0.0 — MVP operacional.

## Primeira tarefa esperada

Antes de programar, propor:

1. stack técnica;
2. estrutura do repositório;
3. arquitetura de pastas;
4. modelo inicial do banco;
5. estratégia de autenticação;
6. estratégia de permissões;
7. estratégia de deploy local;
8. estratégia de deploy interno;
9. plano de fases;
10. dúvidas críticas para o Eric.