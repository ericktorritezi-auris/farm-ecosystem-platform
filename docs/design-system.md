# SpecGov Design System

Implementacao do manual de identidade visual SpecGov v2.0 como foundation architecture da plataforma.

## Tokens

Os tokens oficiais estao em:

- `app/globals.css`: CSS variables e aliases semanticos;
- `tailwind.config.ts`: integracao Tailwind;
- `src/shared/design-system/tokens.ts`: contrato TypeScript para referencia em codigo.

## Cores principais

- Navy Governance: `#0F1E4B`
- Cobalt Authority: `#1E4ED8`
- Cobalt Hover: `#1A56F5`
- Cobalt Tint: `#EFF6FF`
- Surface 0: `#FFFFFF`
- Surface 1: `#F8FAFC`
- Surface 2: `#F1F5F9`
- Dark Background: `#0F172A`
- Dark Nav: `#0D1B2E`
- Dark Surface: `#1E293B`
- Dark Border: `#334155`
- Emerald: `#059669`
- Amber Warning: `#D97706`
- Red Critical: `#DC2626`
- Cyan Trace: `#0891B2`
- Souyess Link: `#E85400`

## Tipografia

O sistema usa:

- Geist como fonte operacional principal;
- Inter como fonte corporativa complementar;
- IBM Plex Mono para identificadores, codigos, versoes e referencias tecnicas.

Classes semanticas:

- `.sg-display`
- `.sg-heading-1`
- `.sg-heading-2`
- `.sg-heading-3`
- `.sg-label`
- `.sg-caption`
- `.sg-overline`
- `.sg-code`

## Layout

- Sidebar fixa: `240px`
- Topbar: `48px`
- Grid: base `8px`
- Mobile: bottom navigation com toque minimo de `44px`
- Fundo: blueprint grid quase imperceptivel, com contraste baixo e funcao apenas arquitetural.

## Contratos de layout

- Toda pagina operacional deve usar `AppShell` e `PageHeader`.
- Conteudo principal deve manter padding responsivo padrao: `16px` mobile, `24px` tablet, `32px` desktop.
- Acoes primarias ficam no canto superior direito do `PageHeader`, nunca dispersas no corpo da pagina.
- Cards em grid devem usar gaps de `16px` ou `24px`; evitar gaps arbitrarios.
- Paginas com leitura densa devem priorizar largura fluida, sem hero visual ou elementos promocionais.
- Sidebar, topbar e navegacao principal sao estruturas fixas do produto e nao devem ser reimplementadas por modulo.

## Regras de densidade

- Dashboards: cards KPI com padding minimo de `20px`.
- Tabelas: linhas com altura visual entre `44px` e `48px`.
- Formularios: campos com altura padrao de `40px`; botoes primarios com `44px`.
- Modais: padding interno de `20px`; cabecalho sempre separado por borda sutil.
- Badges e status devem ser compactos, sem competir com dados primarios.

## Padroes de tabela

- Header deve usar navy suavizado, nao navy puro dominante.
- Texto do header deve ser uppercase, pequeno e com tracking moderado.
- Rows podem alternar superficies de forma discreta.
- Hover deve usar cobalt tint com baixa intensidade.
- Codigos funcionais devem usar IBM Plex Mono.
- Tabelas de auditoria ou rastreabilidade devem preservar divisores horizontais claros.

## Padroes de formulario

- Inputs, selects e textareas usam borda `input-border`, foco cobalt e ring discreto.
- Placeholders devem usar `slate-muted`.
- Labels usam `.sg-label`.
- Mensagens de erro, alerta e sucesso devem usar os tokens semanticos, nunca cores ad hoc.

## Padroes de modal

- Modal deve ser usado para decisao ou edicao contextual curta.
- Nao usar modal para fluxos longos ou paginas de detalhe.
- Overlay deve ser escuro e discreto, sem blur expressivo.
- Acoes destrutivas devem ficar visualmente separadas das acoes primarias.

## Padroes responsivos

- A sidebar lateral e substituida por bottom navigation em telas menores.
- Elementos interativos mobile devem respeitar toque minimo de `44px`.
- Tabelas devem permitir overflow horizontal controlado.
- Cards em mobile devem empilhar em uma coluna.

## Contratos de composicao

- Componentes de modulo devem compor os componentes de `src/shared/ui`; nao recriar estilos locais equivalentes.
- Novos componentes devem receber classes por `className` e usar `cn`.
- Variantes devem ser semanticas: `default`, `secondary`, `ghost`, `destructive`, `approved`, `review`, `pending`.
- Icones devem vir de Lucide, com stroke `1.5px` e tamanhos `12`, `16`, `20` ou `24`.
- Evitar sombras decorativas; sombras devem comunicar camada, foco ou acao.

## Componentes

Componentes base em `src/shared/ui`:

- Button
- Input
- Select
- Textarea
- Card
- KPI Card
- Badge
- Alert
- Table
- Nav Item
- Stepper
- Modal
- Tabs
- Search Input
- Empty State
- Status Indicators
- Breadcrumb

## Regras de uso

- Evitar gradientes, glassmorphism, neon e efeitos decorativos excessivos.
- Usar Lucide com stroke `1.5px`.
- Respeitar contraste WCAG AA.
- Preservar a proporcao 80 / 15 / 5: neutros, cobalt e cores semanticas.
- Usar Souyess orange no maximo uma vez por layout como elo corporativo.
- Nao aumentar a opacidade do blueprint grid sem revisao visual.
- Nao usar cobalt como cor de superficie dominante; cobalt e reservado para acao, foco, selecao e informacao operacional.
- Nao transformar botoes primarios em CTAs de marketing; eles representam comandos operacionais.
