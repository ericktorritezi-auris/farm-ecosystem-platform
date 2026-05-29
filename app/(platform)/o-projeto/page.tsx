"use client";

import {
  ArrowDown,
  BadgeCheck,
  Binary,
  BookOpenText,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  DatabaseZap,
  FileStack,
  GitBranch,
  Milestone,
  Network,
  Route,
  ShieldCheck,
  Sparkles,
  Timer,
  UserCheck,
  UsersRound
} from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/shared/layout/page-header";
import { Badge, Card, CardContent, CardHeader, CardTitle, KpiCard } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";

const tabs = [
  "Visao executiva",
  "Evolucao",
  "Maturidade",
  "Arquitetura",
  "Governanca",
  "Perfis",
  "Visao futura",
  "Implementacao"
] as const;

type TabKey = (typeof tabs)[number];

const timeline = [
  ["v0.1.0 Foundation", "Scaffold Next.js, Prisma, PostgreSQL, documentacao inicial e estrutura modular."],
  ["v0.1.1 Design System", "SpecGov Design System aplicado como foundation visual enterprise."],
  ["v0.1.2 State Scope", "Abrangencia estadual estruturada para particularidades funcionais."],
  ["v0.1.3 Architecture Consolidation", "Dominio consolidado para multiempresa, documentos, importacao e aderencia."],
  ["v0.1.4 Governance Hardening", "Contratos de hierarquia, substituicao, versionamento e comparativo documental."],
  ["v0.2.0 Core Governance Engine Foundation", "Company, papeis por empresa, Version, Snapshot, ChangeSet e services base."],
  ["v0.2.1 Security & Access Layer", "Camada de acesso, sessao operacional e guardas por empresa."],
  ["v0.3.0 Operational Governance", "Cadastros operacionais, fluxo de alteracao e governanca diaria."],
  ["v0.4.0 Document Intelligence", "Geracao DOCX, comparativos e contratos documentais inteligentes."],
  ["v0.5.0 Cognitive Adherence Engine", "Analise de aderencia com revisao humana, evidencias e auditoria."]
] as const;

const maturity = [
  ["Arquitetura", 100],
  ["Governanca", 95],
  ["Multiempresa", 90],
  ["Versionamento", 90],
  ["Permissoes", 75],
  ["CRUDs Operacionais", 0],
  ["Documentacao Inteligente", 0],
  ["IA Cognitiva", 0]
] as const;

const architectureLayers = [
  ["Empresa", "Tenant principal, isolando operacao, papeis, sistemas e governanca."],
  ["Sistema", "Produto ou sistema corporativo vinculado a uma empresa."],
  ["Modulo", "Agrupamento funcional dentro de um sistema."],
  ["Funcionalidade", "Capacidade operacional que organiza particularidades."],
  ["Particularidade/Funcao", "Unidade principal da especificacao funcional, versionada e auditavel."]
] as const;

const governanceLayers = [
  ["Version", "Marco versionado de uma entidade governada."],
  ["Snapshot", "Estado completo preservado para historico e comparacao."],
  ["ChangeSet", "Operacao governada que agrupa uma mudanca relevante."],
  ["ChangeSetItem", "Detalhe campo a campo, incluindo impacto documental."]
] as const;

const roles = [
  ["Administrador", ["parametrizacao", "empresas", "usuarios", "governanca global"], ShieldCheck],
  ["Agente Lider", ["modulos", "funcionalidades", "templates futuros", "aprovacao"], UserCheck],
  ["Agente Aprovador", ["aprovacao", "aderencia futura", "revisao"], ClipboardCheck],
  ["Agente", ["cadastro", "manutencao", "operacao"], UsersRound]
] as const;

const roadmap = [
  ["Importacao Massiva", DatabaseZap],
  ["Gestao Operacional Completa", Boxes],
  ["Documentacao Inteligente", BookOpenText],
  ["Documentos Comparativos", FileStack],
  ["IA Cognitiva de Aderencia", BrainCircuit],
  ["Comparacao Automatica de TR", Binary],
  ["Mapa Arquitetural Interativo", Network],
  ["Analytics e Indicadores", Route]
] as const;

const strategicRoadmap = [
  [
    "Fase 1",
    "Foundation",
    "Concluido",
    "Base visual, dominio, tenancy, versionamento e governanca estrutural ja consolidados.",
    [
      "Design System",
      "Multiempresa (Tenancy)",
      "Governanca Base",
      "Versionamento Base",
      "Estrutura Hierarquica",
      "Estados / Escopo Estadual",
      "Core Governance Engine"
    ]
  ],
  [
    "Fase 2",
    "Operacao Governada",
    "Em andamento",
    "Camada de seguranca, acesso, papeis, workflows e auditoria operacional.",
    [
      "Gestao de Usuarios",
      "Papeis por Empresa",
      "Workflows de Aprovacao",
      "Auditoria Operacional",
      "Navegacao Governada",
      "Controle de Permissoes"
    ]
  ],
  [
    "Fase 3",
    "Producao Operacional",
    "Planejado",
    "Operacao diaria das especificacoes funcionais com controle completo de mudancas.",
    [
      "Importacao Massiva",
      "Gestao Completa de Especificacoes",
      "Visualizacao Global",
      "Renumeracao Automatica",
      "Substituicao Governada",
      "Gestao Operacional Diaria"
    ]
  ],
  [
    "Fase 4",
    "Inteligencia Documental",
    "Planejado",
    "Geracao governada de documentos modulares, publicados e comparativos.",
    [
      "Templates Dinamicos",
      "Geracao DOCX",
      "Geracao PDF",
      "Documentacao Modular",
      "Documentacao Comparativa",
      "Publicacao Governada"
    ]
  ],
  [
    "Fase 5",
    "Inteligencia Cognitiva",
    "Planejado",
    "Apoio analitico para aderencia, licitacoes e leitura funcional de termos de referencia.",
    [
      "Comparacao de TR",
      "IA Cognitiva",
      "Avaliacao de Aderencia",
      "Cobertura Funcional",
      "Apoio Estrategico a Licitacao",
      "Recomendacoes Inteligentes"
    ]
  ],
  [
    "Fase 6",
    "Plataforma Enterprise",
    "Visao de longo prazo",
    "Consolidacao corporativa com analytics, inteligencia de dados e governanca integrada.",
    [
      "Analytics Corporativo",
      "Indicadores Executivos",
      "Data Intelligence",
      "Mapa Arquitetural",
      "Gestao Integrada",
      "Governanca Corporativa Completa"
    ]
  ]
] as const;

const futureMaturity = [
  ["Foundation", 100],
  ["Operacao Governada", 15],
  ["Producao Operacional", 0],
  ["Inteligencia Documental", 0],
  ["Inteligencia Cognitiva", 0]
] as const;

const doneItems = [
  "Foundation tecnica Next.js, TypeScript, Tailwind e Prisma.",
  "Design System SpecGov com app shell, componentes e tokens.",
  "Abrangencia estadual parametrizada para particularidades.",
  "Arquitetura alvo consolidada para governanca enterprise.",
  "Hardening documental de versionamento, hierarquia e substituicao.",
  "Core Governance Engine Foundation com multiempresa e versionamento canonico."
];

const planningItems = [
  "Security & Access Layer.",
  "Governanca operacional das especificacoes.",
  "Renumeração hierarquica transacional.",
  "Workflow de aprovacao governado.",
  "Primeiros CRUDs operacionais."
];

const notStartedItems = [
  "Geracao DOCX inteligente.",
  "Documentos comparativos renderizados.",
  "IA cognitiva de aderencia.",
  "Importacao massiva Excel.",
  "Modulos futuros do ecossistema."
];

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-specgov-navy dark:text-specgov-dark-text">{label}</span>
        <span className="font-mono text-code text-specgov-slate-muted">{value}%</span>
      </div>
      <div className="h-2 rounded-sm bg-specgov-surface-2 dark:bg-specgov-dark-surface-muted" aria-hidden>
        <div
          className="h-full rounded-sm bg-specgov-cobalt transition-[width] duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ConnectedStack({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="grid gap-3">
      {items.map(([title, description], index) => (
        <div key={title}>
          <Card className="p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-semibold text-specgov-navy dark:text-specgov-dark-text">{title}</p>
                <p className="mt-1 text-sm leading-6 text-specgov-slate dark:text-specgov-slate-muted">{description}</p>
              </div>
              <Badge tone="published">{String(index + 1).padStart(2, "0")}</Badge>
            </div>
          </Card>
          {index < items.length - 1 ? (
            <div className="flex h-9 items-center justify-center text-specgov-slate-muted">
              <ArrowDown className="size-4 stroke-[1.5]" aria-hidden />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-5 max-w-3xl">
      <p className="sg-overline">Executive showcase</p>
      <h2 className="mt-2 text-h2">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-specgov-slate dark:text-specgov-slate-muted">{description}</p>
    </div>
  );
}

function statusTone(status: string) {
  if (status === "Concluido") {
    return "approved";
  }

  if (status === "Em andamento") {
    return "review";
  }

  if (status === "Visao de longo prazo") {
    return "published";
  }

  return "pending";
}

function StrategicRoadmap() {
  return (
    <div className="grid gap-4">
      {strategicRoadmap.map(([phase, title, status, description, items], index) => (
        <div key={title} className="grid gap-4 lg:grid-cols-[32px_1fr]">
          <div className="hidden flex-col items-center lg:flex">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full border text-[11px] font-semibold",
                status === "Concluido"
                  ? "border-emerald-200 bg-specgov-emerald-tint text-specgov-emerald"
                  : status === "Em andamento"
                    ? "border-amber-200 bg-specgov-amber-tint text-specgov-amber"
                    : "border-specgov-border-light bg-specgov-surface-2 text-specgov-slate"
              )}
            >
              {index + 1}
            </span>
            {index < strategicRoadmap.length - 1 ? <span className="mt-2 h-20 w-px bg-border" aria-hidden /> : null}
          </div>
          <Card className="p-5">
            <div className="grid gap-5 xl:grid-cols-[0.95fr_1.15fr]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="default">{phase}</Badge>
                  <Badge tone={statusTone(status)}>{status}</Badge>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-specgov-navy dark:text-specgov-dark-text">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-specgov-slate dark:text-specgov-slate-muted">{description}</p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-specgov-slate dark:text-specgov-slate-muted">
                    <CheckCircle2
                      className={cn(
                        "size-4 shrink-0 stroke-[1.5]",
                        status === "Concluido" ? "text-specgov-emerald" : "text-specgov-cobalt"
                      )}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default function ProjectShowcasePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Visao executiva");

  const currentTab = useMemo(() => activeTab, [activeTab]);

  return (
    <>
      <PageHeader
        overline="Comunicacao executiva"
        title="O Projeto"
        description="Area institucional estatica para apresentar visao, maturidade, arquitetura, governanca e roadmap do SpecGov."
      />

      <nav
        className="mb-6 flex gap-1 overflow-x-auto border-b border-border/85 pb-px"
        aria-label="Secoes executivas do projeto"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "h-10 shrink-0 border-b-2 border-transparent px-3 text-[13px] font-medium text-specgov-slate-muted transition-colors duration-sg hover:text-specgov-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:text-specgov-dark-text",
              currentTab === tab && "border-specgov-cobalt text-specgov-cobalt"
            )}
            aria-pressed={currentTab === tab}
          >
            {tab}
          </button>
        ))}
      </nav>

      {currentTab === "Visao executiva" ? (
        <section>
          <div className="mb-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="py-3">
              <Badge tone="published">SpecGov</Badge>
              <h2 className="mt-4 max-w-4xl text-[2rem] font-semibold leading-[2.5rem] text-specgov-navy dark:text-specgov-dark-text">
                Plataforma Enterprise de Governanca Funcional, Versionamento Inteligente,
                Rastreabilidade Corporativa e Inteligencia de Aderencia.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-specgov-slate dark:text-specgov-slate-muted">
                O SpecGov estrutura o conhecimento funcional dos sistemas corporativos, preserva historico de
                decisoes, prepara documentos governados e cria a base para analises futuras de aderencia tecnica.
              </p>
            </div>
            <Card className="p-6">
              <p className="sg-label">Objetivo Estrategico</p>
              <p className="mt-3 text-sm leading-7 text-specgov-slate dark:text-specgov-slate-muted">
                Transformar especificacoes funcionais em ativos corporativos versionados, auditaveis e reutilizaveis
                para POCs, licitacoes, governanca interna, comparativos documentais e inteligencia de aderencia.
              </p>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Status" value="Em Desenvolvimento" trend="foundation enterprise em evolucao" icon={Timer} tone="warning" />
            <KpiCard label="Versao Atual" value="v0.2.0" trend="Core Governance Engine Foundation" icon={Milestone} />
            <KpiCard label="Fase Atual" value="Governance" trend="dominio, versionamento e tenancy" icon={ShieldCheck} tone="success" />
            <KpiCard label="Postura" value="Realista" trend="22% de maturidade global atual" icon={BadgeCheck} tone="trace" />
          </div>
        </section>
      ) : null}

      {currentTab === "Evolucao" ? (
        <section>
          <SectionTitle
            title="Evolucao do projeto"
            description="Marcos concluidos e planejados, com foco em maturidade arquitetural antes de funcionalidades operacionais."
          />
          <div className="space-y-4">
            {timeline.map(([title, description], index) => {
              const complete = index <= 5;
              return (
                <div key={title} className="grid gap-4 md:grid-cols-[32px_1fr]">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full border",
                        complete
                          ? "border-emerald-200 bg-specgov-emerald-tint text-specgov-emerald"
                          : "border-amber-200 bg-specgov-amber-tint text-specgov-amber"
                      )}
                    >
                      {complete ? <CheckCircle2 className="size-4 stroke-[1.5]" /> : <Timer className="size-4 stroke-[1.5]" />}
                    </span>
                    {index < timeline.length - 1 ? <span className="mt-2 h-10 w-px bg-border" aria-hidden /> : null}
                  </div>
                  <Card className="p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-specgov-navy dark:text-specgov-dark-text">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-specgov-slate dark:text-specgov-slate-muted">{description}</p>
                      </div>
                      <Badge tone={complete ? "approved" : "review"}>{complete ? "Concluido" : "Planejado"}</Badge>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {currentTab === "Maturidade" ? (
        <section>
          <SectionTitle
            title="Maturidade da plataforma"
            description="Leitura executiva realista: a fundacao esta forte, mas as funcionalidades operacionais ainda nao foram iniciadas."
          />
          <div className="grid gap-4 xl:grid-cols-[0.65fr_1fr]">
            <Card className="p-6">
              <p className="sg-label">KPI principal</p>
              <p className="mt-4 text-[3rem] font-semibold leading-none text-specgov-navy dark:text-specgov-dark-text">22%</p>
              <p className="mt-3 text-sm leading-6 text-specgov-slate dark:text-specgov-slate-muted">
                Maturidade Atual da Plataforma. Percentual propositalmente conservador, considerando ausencia de CRUDs,
                documentos inteligentes e IA operacional.
              </p>
            </Card>
            <Card className="p-6">
              <div className="grid gap-4">
                {maturity.map(([label, value]) => (
                  <ProgressBar key={label} label={label} value={value} />
                ))}
              </div>
            </Card>
          </div>
        </section>
      ) : null}

      {currentTab === "Arquitetura" ? (
        <section>
          <SectionTitle
            title="Arquitetura do produto"
            description="Modelo hierarquico oficial para organizar especificacoes funcionais em contexto multiempresa."
          />
          <ConnectedStack items={architectureLayers} />
        </section>
      ) : null}

      {currentTab === "Governanca" ? (
        <section>
          <SectionTitle
            title="Governanca e versionamento"
            description="Modelo canonico que sustenta historico, auditoria, comparativos e rastreabilidade corporativa."
          />
          <ConnectedStack items={governanceLayers} />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {["Rastreabilidade", "Auditoria", "Historico", "Comparativos"].map((item) => (
              <Card key={item} className="p-5">
                <GitBranch className="mb-4 size-5 stroke-[1.5] text-specgov-cobalt" aria-hidden />
                <p className="font-semibold text-specgov-navy dark:text-specgov-dark-text">{item}</p>
                <p className="mt-2 text-sm leading-6 text-specgov-slate dark:text-specgov-slate-muted">
                  Base estrutural para decisoes versionadas e evidencias corporativas.
                </p>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {currentTab === "Perfis" ? (
        <section>
          <SectionTitle
            title="Perfis e responsabilidades"
            description="Modelo executivo dos papeis previstos para operacao governada por empresa."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roles.map(([role, responsibilities, Icon]) => (
              <Card key={role} className="p-5">
                <Icon className="mb-4 size-5 stroke-[1.5] text-specgov-cobalt" aria-hidden />
                <p className="font-semibold text-specgov-navy dark:text-specgov-dark-text">{role}</p>
                <ul className="mt-4 space-y-2">
                  {responsibilities.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-specgov-slate dark:text-specgov-slate-muted">
                      <span className="size-1.5 rounded-full bg-specgov-cobalt" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {currentTab === "Visao futura" ? (
        <section>
          <SectionTitle
            title="Visao futura"
            description="Roadmap visual dos dominios planejados para ampliar a plataforma alem da foundation atual."
          />
          <div className="mb-6 grid gap-4 xl:grid-cols-[1.35fr_0.75fr]">
            <Card className="p-6">
              <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="sg-overline">Roadmap estrategico do SpecGov</p>
                  <h3 className="mt-2 text-h2">Ondas de maturidade incremental</h3>
                </div>
                <Badge tone="published">v0.2.0 atual</Badge>
              </div>
              <p className="mb-6 max-w-4xl text-sm leading-7 text-specgov-slate dark:text-specgov-slate-muted">
                O SpecGov esta sendo construido em ondas de maturidade incremental, priorizando governanca,
                rastreabilidade, versionamento e inteligencia operacional antes da expansao para automacao documental
                e inteligencia cognitiva.
              </p>
              <StrategicRoadmap />
            </Card>

            <Card className="p-6">
              <p className="sg-label">Maturidade da Plataforma</p>
              <p className="mt-4 text-[3rem] font-semibold leading-none text-specgov-navy dark:text-specgov-dark-text">22%</p>
              <p className="mt-3 text-sm leading-6 text-specgov-slate dark:text-specgov-slate-muted">
                Indicador estatico e conservador para acompanhamento executivo. Deve ser atualizado apenas quando houver
                evolucao real de entrega.
              </p>
              <div className="mt-6 grid gap-4">
                {futureMaturity.map(([label, value]) => (
                  <ProgressBar key={label} label={label} value={value} />
                ))}
              </div>
            </Card>
          </div>

          <div className="mb-5 max-w-3xl">
            <p className="sg-overline">Capacidades planejadas</p>
            <h3 className="mt-2 text-h2">Proximos blocos de evolucao</h3>
            <p className="mt-2 text-sm leading-6 text-specgov-slate dark:text-specgov-slate-muted">
              A jornada estrategica acima orienta as capacidades futuras abaixo, mantendo foco em governanca antes da
              automacao avancada.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roadmap.map(([title, Icon]) => (
              <Card key={title} className="p-5">
                <Icon className="mb-4 size-5 stroke-[1.5] text-specgov-cobalt" aria-hidden />
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-specgov-navy dark:text-specgov-dark-text">{title}</p>
                  <Badge tone="pending">Planejado</Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {currentTab === "Implementacao" ? (
        <section>
          <SectionTitle
            title="Status de implementacao"
            description="Leitura executiva do que ja esta entregue, do que esta em planejamento e do que ainda nao iniciou."
          />
          <div className="grid gap-4 xl:grid-cols-3">
            {[
              ["Concluido", doneItems, "approved", CheckCircle2],
              ["Em Planejamento", planningItems, "review", Timer],
              ["Nao Iniciado", notStartedItems, "pending", Sparkles]
            ].map(([title, items, tone, Icon]) => (
              <Card key={title as string}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>{title as string}</CardTitle>
                    <Badge tone={tone as "approved" | "review" | "pending"}>{(items as string[]).length} itens</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(items as string[]).map((item) => {
                      const TypedIcon = Icon as typeof CheckCircle2;
                      return (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-specgov-slate dark:text-specgov-slate-muted">
                          <TypedIcon className="mt-1 size-4 shrink-0 stroke-[1.5] text-specgov-cobalt" aria-hidden />
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
