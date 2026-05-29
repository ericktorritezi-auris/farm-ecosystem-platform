# Modelo de Dominio

## Objetivo

Consolidar a arquitetura alvo do dominio SpecGov antes da construcao do Core Governance Engine.

## Entidades centrais

### Tenancy

- `Company`: tenant principal.
- `User`: identidade de acesso.
- `Role`: papel operacional.
- `Permission`: acao granular.
- `CompanyUserRole`: vincula usuario, empresa e papel.

### Especificacoes

- `System`: sistema de uma empresa. Possui codigo livre.
- `SystemModule`: modulo de um sistema. Codigo hierarquico gerado.
- `Feature`: funcionalidade de um modulo. Codigo hierarquico gerado.
- `FunctionalItem`: particularidade/funcao. Codigo hierarquico gerado.
- `FunctionalItemReplacementGroup`: grupo governado de substituicao entre particularidades.
- `FunctionalItemReplacement`: vinculo entre itens antigos e novos em substituicoes 1:1, 1:N, N:1 e N:N.
- `BrazilianState`: UF parametrizada.
- `FunctionalItemState`: vinculo N:N entre particularidade e UF.

### Governanca

- `ApprovalFlow`: configuracao de fluxo por empresa e dominio.
- `ApprovalStep`: etapa do fluxo.
- `ApprovalRequest`: solicitacao de aprovacao.
- `ApprovalDecision`: decisao de aprovador.
- `ApprovalHistory`: trilha historica do workflow.

### Versionamento

- `Version`: marco versionado de entidade governada.
- `Snapshot`: estado completo no momento versionado.
- `ChangeSet`: mudancas entre versoes.
- `ChangeSetItem`: mudanca por campo ou bloco.

### Importacao

- `ImportBatch`: lote de importacao.
- `ImportBatchRow`: linha de arquivo importado.
- `ImportValidation`: resultado de validacao.
- `ImportExecution`: execucao do processamento.

### Documentos

- `DocumentTemplate`: template documental.
- `DocumentTemplateVersion`: versao de template.
- `DocumentGeneration`: solicitacao/resultado de geracao.
- `DocumentGenerationHistory`: historico da geracao.

### Aderencia

- `AdherenceAnalysis`: analise de aderencia.
- `AdherenceAnalysisItem`: item analisado.
- `AdherenceFinding`: achado de aderencia.
- `AdherenceDecision`: decisao humana ou sistemica.
- `AdherenceOverride`: override humano.
- `AdherenceEvidence`: evidencia vinculada.

### Auditoria

- `AuditLog`: trilha tecnica e funcional.
- `AuditEventMetadata`: metadados estruturados quando necessario.

## Mapa de relacionamentos

```text
Company
  -> CompanyUserRole
      -> User
      -> Role
          -> Permission
  -> System
      -> SystemModule
          -> Feature
              -> FunctionalItem
                  -> FunctionalItemState
                      -> BrazilianState
                  -> FunctionalItemReplacement
                  -> FunctionalItemReplacementGroup
                  -> Version
                  -> ApprovalRequest
  -> ImportBatch
      -> ImportBatchRow
      -> ImportValidation
      -> ImportExecution
  -> DocumentTemplate
      -> DocumentTemplateVersion
  -> DocumentGeneration
      -> DocumentGenerationHistory
  -> AdherenceAnalysis
      -> AdherenceAnalysisItem
          -> AdherenceFinding
          -> AdherenceDecision
          -> AdherenceOverride
          -> AdherenceEvidence
  -> AuditLog
```

## Regras de escopo empresarial

Entidades com `companyId` direto recomendado:

- `System`
- `ApprovalFlow`
- `ApprovalRequest`
- `ImportBatch`
- `DocumentTemplate`
- `DocumentGeneration`
- `AdherenceAnalysis`
- `AuditLog`
- `CompanyUserRole`

Entidades que herdam empresa pela hierarquia, mas podem manter denormalizacao por desempenho/historico:

- `SystemModule`
- `Feature`
- `FunctionalItem`
- `Version`
- `Snapshot`
- `ChangeSet`

## Hierarquia funcional

### Codigo

- Sistema: codigo livre, por exemplo `1`, `TRIB`, `IPTU`.
- Modulo: gerado a partir do sistema, por exemplo `1.1`.
- Funcionalidade: gerado a partir do modulo, por exemplo `1.1.1`.
- Particularidade/Funcao: gerado a partir da funcionalidade, por exemplo `1.1.1.1`.

### Ordem

Cada nivel abaixo de sistema deve possuir:

- `parentId`;
- `position`;
- `hierarchyCode`;
- `isDeleted`;
- `deletedAt`;
- `replacedById`, quando houver substituicao.

## FunctionalItem canonico

`FunctionalItem` e a unidade principal de especificacao funcional. A modelagem alvo deve prever os seguintes campos canonicos:

- `companyId`: empresa/tenant proprietaria.
- `systemId`: sistema ao qual pertence.
- `moduleId`: modulo ao qual pertence.
- `featureId`: funcionalidade ao qual pertence.
- `hierarchyCode`: codigo exibido, por exemplo `1.1.1.2`.
- `position`: ordem relativa dentro da funcionalidade.
- `title` ou `name`: titulo curto da particularidade/funcao.
- `description`: descricao funcional.
- `natureId`: natureza parametrizada.
- `statusId`: status parametrizado.
- `opinionTypeId`: parecer vigente ou parecer da ultima proposta relevante.
- `pocRequired`: exigivel em POC.
- `scopeType`: `GENERAL` ou `STATE_SPECIFIC`.
- `observation`: observacoes funcionais.
- `isDeleted`: exclusao logica.
- `deletedAt`: data/hora da exclusao logica.
- `deletedById`: usuario responsavel pela exclusao logica.
- `deletedReason`: justificativa da exclusao.
- `createdById`: usuario criador.
- `updatedById`: ultimo usuario alterador.
- `createdAt`: data/hora de criacao.
- `updatedAt`: data/hora da ultima alteracao.

Campos derivados ou governados:

- `hierarchyCode` nunca deve ser editado livremente por usuario.
- `position` deve ser alterado apenas pelo `HierarchyRenumberingService`.
- `isDeleted`, `deletedAt`, `deletedById` e `deletedReason` devem gerar `ChangeSet LOGICAL_DELETE`.
- substituicoes complexas devem usar `FunctionalItemReplacementGroup` e `FunctionalItemReplacement`, nao apenas `replacedById`.

### Insercao

Inserir novo item no fim do grupo por padrao. Insercao entre itens deve recalcular `position` e `hierarchyCode` do grupo afetado.

### Reordenacao

Reordenacao deve gerar `ChangeSet`, registrar auditoria e preservar snapshot anterior.

### Substituicao

Substituicao nao deve apagar o item original. O item antigo recebe estado logico de substituido/removido e a relacao entre origem e destino deve ser registrada por `FunctionalItemReplacementGroup` e `FunctionalItemReplacement`.

## FunctionalItemReplacementGroup

Agrupa uma operacao de substituicao aprovada ou proposta.

Campos canonicos:

- `id`;
- `companyId`;
- `featureId`;
- `reason`;
- `observation`;
- `createdById`;
- `approvedById`;
- `approvalRequestId`;
- `createdAt`;
- `approvedAt`.

Uso:

- uma operacao 1:1 tem um grupo com um vinculo;
- uma operacao 1:N tem um grupo com uma origem e varios destinos;
- uma operacao N:1 tem um grupo com varias origens e um destino;
- uma operacao N:N tem um grupo com multiplas origens e multiplos destinos;
- exclusao sem substituicao nao exige destino, mas deve gerar `LOGICAL_DELETE`.

## FunctionalItemReplacement

Vinculo entre particularidade/funcoes substituidas e substitutas.

Campos canonicos:

- `id`;
- `replacementGroupId`;
- `sourceFunctionalItemId`;
- `targetFunctionalItemId`;
- `sourceVersionId`;
- `targetVersionId`;
- `sourceHierarchyCode`;
- `targetHierarchyCode`;
- `replacementType`;
- `createdAt`.

Valores recomendados de `replacementType`:

- `ONE_TO_ONE`;
- `ONE_TO_MANY`;
- `MANY_TO_ONE`;
- `MANY_TO_MANY`;
- `REMOVED_WITHOUT_REPLACEMENT`.

Quando um item e removido sem substituicao, o grupo pode existir para auditoria da decisao, mas `targetFunctionalItemId` deve ficar vazio ou ser representado por um tipo proprio de relacao sem destino, conforme a modelagem fisica futura.

### Exclusao logica

Excluir significa marcar `isDeleted`, registrar `deletedAt`, `deletedById`, motivo e ChangeSet.

## Abrangencia estadual

`FunctionalItem.scopeType`:

- `GENERAL`
- `STATE_SPECIFIC`

`STATE_SPECIFIC` exige ao menos uma linha em `FunctionalItemState`. Essa regra deve ser aplicada na camada de servico.

## Invariantes do dominio

- Nenhuma entidade operacional deve existir fora de uma empresa, exceto cadastros globais parametrizados.
- Nenhum item especifico por estado pode usar texto livre para UF.
- Nenhuma edicao relevante pode sobrescrever historico sem snapshot.
- Nenhuma aprovacao deve ocorrer fora do escopo de papel e empresa do aprovador.
- Nenhuma renumeracao deve ocorrer sem preservar codigo anterior, codigo novo, posicao anterior e posicao nova.
- Nenhuma substituicao 1:N ou N:N deve ser representada apenas por `replacedById`.
