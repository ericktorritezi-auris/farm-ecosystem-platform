# Matriz de Permissoes

## Modelo

Permissoes sao avaliadas por:

```text
Usuario + Empresa + Papel + Acao + Escopo
```

Permissao global deve ser excecao, reservada ao Administrador Master.

## Papeis minimos

- `AGENT`: agente cadastrador/editor.
- `APPROVER`: aprovador.
- `LEADER`: lider.
- `ADMIN`: administrador da empresa.
- `MASTER_ADMIN`: administrador global.

## Escopos

- Global.
- Empresa.
- Sistema.
- Modulo.
- Funcionalidade.

## Matriz operacional

| Acao | Agente | Aprovador | Lider | Administrador | Master |
| --- | --- | --- | --- | --- | --- |
| consultar | permitido | permitido | permitido | permitido | permitido |
| criar especificacao | permitido | proibido | permitido | permitido | permitido |
| editar especificacao | permitido | proibido | permitido | permitido | permitido |
| propor substituicao | permitido | permitido | permitido | permitido | permitido |
| excluir logicamente | proibido | proibido | permitido | permitido | permitido |
| aprovar | proibido | permitido no escopo | permitido no escopo | permitido | permitido |
| reprovar | proibido | permitido no escopo | permitido no escopo | permitido | permitido |
| solicitar ajuste | proibido | permitido no escopo | permitido no escopo | permitido | permitido |
| administrar usuarios | proibido | proibido | limitado | permitido | permitido |
| administrar permissoes | proibido | proibido | proibido | permitido na empresa | permitido |
| importar massa | permitido com revisao | proibido | permitido | permitido | permitido |
| executar importacao final | proibido | proibido | permitido | permitido | permitido |
| gerar documentos | permitido | permitido | permitido | permitido | permitido |
| alterar template documental | proibido | proibido | permitido | permitido | permitido |
| executar aderencia | permitido | permitido | permitido | permitido | permitido |
| aplicar override de aderencia | proibido | permitido | permitido | permitido | permitido |
| consultar auditoria | proibido | limitado | permitido | permitido | permitido |

## Acoes proibidas por principio

- Usuario sem empresa ativa nao pode operar entidades empresariais.
- Aprovador nao deve aprovar mudanca fora do seu escopo.
- Agente nao deve publicar alteracao sem workflow quando a regra exigir aprovacao.
- Nenhum papel operacional deve apagar logs.
- Nenhum usuario comum deve alterar snapshot historico.

## Escopo por empresa

Exemplo:

```text
Joao -> Sigcorp -> LEADER
Joao -> Zouphy -> AGENT
Joao -> Etherium -> APPROVER
```

A sessao deve exigir empresa ativa para operacoes empresariais.

## Permissoes granulares recomendadas

- `company.read`
- `company.manage`
- `system.create`
- `system.update`
- `system.reorder`
- `module.create`
- `feature.create`
- `functional_item.create`
- `functional_item.update`
- `functional_item.replace`
- `functional_item.delete_logical`
- `approval.request`
- `approval.decide`
- `approval.override`
- `document.generate`
- `document.template_manage`
- `import.preview`
- `import.execute`
- `adherence.run`
- `adherence.override`
- `audit.read`
- `permission.manage`

## Impacto em workflows

Workflow deve consultar a matriz antes de:

- abrir solicitacao;
- atribuir aprovador;
- registrar decisao;
- publicar versao;
- executar rollback logico.
