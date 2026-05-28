import { Activity, FileText, GitPullRequestArrow, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/shared/layout/page-header";
import { Alert, Badge, Button, Card, CardContent, CardHeader, CardTitle, KpiCard, StatusIndicator, Table, TBody, TD, TH, THead, TR } from "@/shared/ui";

const rows = [
  ["EF-2026-001", "IPTU", "Em revisao", "v2026.2"],
  ["EF-2026-014", "Divida ativa", "Aprovado", "v2026.1"],
  ["EF-2026-028", "ITBI", "Pendente", "v2026.3"]
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        overline="Governanca operacional"
        title="Dashboard"
        description="Visao executiva das especificacoes funcionais, aprovacoes e rastreabilidade do ecossistema tributario municipal."
        actions={<Button>Nova especificacao</Button>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Sistemas" value="12" trend="+2 no mes" icon={FileText} />
        <KpiCard label="Particularidades" value="428" trend="36 exigiveis em POC" icon={Activity} tone="trace" />
        <KpiCard label="Pendencias" value="18" trend="7 aguardando aprovador" icon={GitPullRequestArrow} tone="warning" />
        <KpiCard label="Compliance" value="94%" trend="auditoria operacional" icon={ShieldCheck} tone="success" />
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Alteracoes recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <THead>
                <TR>
                  <TH>Codigo</TH>
                  <TH>Modulo</TH>
                  <TH>Status</TH>
                  <TH>Versao</TH>
                </TR>
              </THead>
              <TBody>
                {rows.map(([code, module, status, version]) => (
                  <TR key={code}>
                    <TD className="font-mono text-code text-specgov-navy dark:text-specgov-dark-text">{code}</TD>
                    <TD>{module}</TD>
                    <TD>
                      <Badge tone={status === "Aprovado" ? "approved" : status === "Em revisao" ? "review" : "pending"}>
                        {status}
                      </Badge>
                    </TD>
                    <TD>{version}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saude operacional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert title="Fila de aprovacao monitorada" tone="info">
              Workflows criticos devem permanecer rastreaveis e auditaveis.
            </Alert>
            <div className="space-y-3">
              <StatusIndicator tone="approved" label="Itens aprovados" />
              <StatusIndicator tone="review" label="Itens em revisao" />
              <StatusIndicator tone="trace" label="Vinculos rastreaveis" />
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
