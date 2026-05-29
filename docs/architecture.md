# Arquitetura

## Visao geral

O SpecGov e uma plataforma enterprise modular para governanca de especificacoes funcionais. O produto nao deve ser tratado como um CRUD isolado: ele nasce como base para um ecossistema interno com multiempresa, versionamento, auditoria, workflow, documentos, importacao massiva e aderencia cognitiva.

O primeiro modulo operacional continua sendo a Gestao de Especificacoes Funcionais, mas a arquitetura alvo passa a ser orientada pelo Core Governance Engine previsto para a v0.2.0.

## Principios arquiteturais

- Empresa e o tenant principal.
- Permissoes dependem da combinacao Usuario + Empresa + Papel.
- Toda entidade operacional relevante deve ser auditavel.
- Versionamento e snapshot sao conceitos centrais, nao anexos.
- Documentos, importacoes e aderencia sao dominios proprios.
- Estruturas hierarquicas devem suportar reordenacao, substituicao e exclusao logica.
- Renumeracao hierarquica deve ser centralizada pelo `HierarchyRenumberingService`.
- Substituicoes 1:N e N:N devem usar `FunctionalItemReplacementGroup` e `FunctionalItemReplacement`.
- Documentos comparativos devem consumir `DocumentDiffMarker`, `ChangeSetItem` e `Snapshot`.
- Nenhuma regra critica deve depender de texto livre quando puder ser parametrizada.

## Camadas

- `app`: rotas e telas Next.js.
- `src/core`: capacidades transversais da plataforma.
- `src/modules`: modulos de negocio.
- `src/shared`: UI, banco, utilitarios, validacoes e tipos compartilhados.
- `prisma`: schema, migrations e seed.
- `docs`: documentacao operacional e arquitetural.

## Dominios transversais

- `core/auth`: autenticacao e sessoes.
- `core/users`: usuarios, agentes, aprovadores, lideres e administradores.
- `core/permissions`: RBAC por empresa, matriz de permissoes e escopos.
- `core/audit`: logs, trilhas, snapshots e rastreabilidade.
- `core/settings`: parametros globais e parametrizacoes.
- `core/tenancy`: empresa, vinculos de usuario e escopo empresarial.

## Modulos de dominio

- `modules/specifications`: sistemas, modulos, funcionalidades, particularidades/funcoes, abrangencia estadual e hierarquia funcional.
- `modules/governance`: workflow, aprovacoes, historico decisorio e matriz operacional.
- `modules/documents`: templates, versoes de template, geracoes e historico documental.
- `modules/imports`: batches, linhas, validacoes, execucoes, logs e rollback logico.
- `modules/adherence`: analise de aderencia, evidencias, findings, decisoes e override humano.
- `modules/audit`: consultas e visualizacoes da trilha de auditoria.

## Multiempresa

A empresa e o tenant principal.

Hierarquia obrigatoria:

```text
Company -> System -> SystemModule -> Feature -> FunctionalItem
```

Entidades operacionais devem carregar `companyId` direta ou indiretamente. Para consultas, auditoria, importacao, documentos e aderencia, a recomendacao e usar `companyId` direto para evitar ambiguidade historica e facilitar isolamento de dados.

## Papeis por empresa

Permissao nao e global por padrao.

Modelo alvo:

```text
User -> CompanyUserRole -> Company -> Role
```

O Administrador Master pode ter escopo global, mas usuarios operacionais devem sempre atuar dentro de uma empresa.

## Hierarquia funcional

Estrutura oficial:

```text
Sistema
Modulo
Funcionalidade
Particularidade/Funcao
```

Exibicao hierarquica:

```text
1
1.1
1.1.1
1.1.1.1
```

Apenas Sistema possui codigo livre. Demais niveis devem gerar codigo hierarquico automaticamente com base em ordem, posicao e ancestralidade.

Servicos e contratos:

- `HierarchyRenumberingService`: gerar proximo codigo, inserir, mover, excluir logicamente, substituir e renumerar.
- `FunctionalItemReplacementGroup`: agrupar substituicoes governadas.
- `FunctionalItemReplacement`: relacionar itens origem e destino.
- `DocumentDiffMarker`: orientar documentos comparativos.

## Abrangencia estadual

Particularidades/funcoes podem ser:

- `GENERAL`: aplicaveis a todos os estados.
- `STATE_SPECIFIC`: aplicaveis a uma ou mais UFs.

O cadastro de estados deve permanecer parametrizado pelos 26 estados + Distrito Federal.

Regra documental futura:

- sem filtro por estado: listar todos os itens, sinalizando itens especificos por UF;
- com filtro por estado: listar itens gerais e itens especificos da UF filtrada.

## Versionamento

Versionamento passa a ser dominio central. Toda alteracao relevante deve produzir:

- `Version`: marco versionado.
- `Snapshot`: estado completo relevante no momento.
- `ChangeSet`: diferencas entre estado anterior e novo.
- `ApprovalHistory`: trilha decisoria e pareceres.

## Importacao massiva

A importacao massiva deve ser tratada como pipeline auditavel:

```text
ImportBatch -> ImportBatchRow -> ImportValidation -> ImportExecution
```

O upload ainda nao deve ser implementado, mas o dominio precisa prever template Excel, preview, validacao, execucao, logs e rollback logico.

## Documentos

Documentos sao dominio proprio:

```text
DocumentTemplate -> DocumentTemplateVersion -> DocumentGeneration -> DocumentGenerationHistory
```

Tipos iniciais:

- `FULL_CURRENT`
- `FULL_COMPARATIVE`
- `MODULE_CURRENT`
- `MODULE_COMPARATIVE`

## Aderencia cognitiva

O Adherence Analysis Engine sera preparado para IA futura, sem integracao nesta fase:

```text
AdherenceAnalysis -> AdherenceAnalysisItem -> AdherenceFinding -> AdherenceDecision -> AdherenceOverride -> AdherenceEvidence
```

Fluxo futuro:

```text
TR -> processamento -> comparacao -> aderencia -> revisao humana -> auditoria
```

## Telas futuras documentadas

- Visualizacao completa: filtros por empresa, sistema, modulo, estado e palavra-chave; paginacao, exportacao, historico e workflow.
- Mapa arquitetural: leitura expansivel/recolhivel de Empresa -> Sistemas -> Modulos -> Funcionalidades, sem edicao.

## Documentos complementares

- `docs/domain-model.md`
- `docs/governance-engine.md`
- `docs/permissions-matrix.md`
- `docs/document-architecture.md`
- `docs/adherence-engine.md`
- `docs/import-architecture.md`
- `docs/versioning-strategy.md`
- `docs/workflow-architecture.md`
- `docs/hierarchy-renumbering-strategy.md`
- `docs/replacement-strategy.md`
- `docs/document-diff-contract.md`

## Decisao de arquitetura

O backend e frontend permanecem no mesmo projeto Next.js durante o MVP para acelerar desenvolvimento local e interno. A modularizacao por dominio deve preservar baixo acoplamento e permitir extracao futura de servicos caso o volume, seguranca ou governanca exijam.
