# Types

Tipos compartilhados entre dominios.

## Abrangencia estadual

`state-scope.ts` define o contrato inicial para particularidades/funcoes gerais ou especificas por UF.

Regras:

- `GENERAL`: aplicavel a todos os estados.
- `STATE_SPECIFIC`: aplicavel a uma ou mais UFs.
- filtros documentais futuros podem informar `stateCode`.
