import { PageHeader } from "@/shared/layout/page-header";
import { Alert, Card, CardContent, KpiCard } from "@/shared/ui";
import { ClipboardCheck, ShieldCheck, TriangleAlert } from "lucide-react";

export default function CompliancePage() {
  return (
    <>
      <PageHeader
        overline="CP"
        title="Compliance"
        description="Indicadores de conformidade operacional, auditoria e aderencia aos fluxos de governanca."
      />
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Conformidade" value="94%" icon={ShieldCheck} tone="success" />
        <KpiCard label="Auditorias" value="31" icon={ClipboardCheck} tone="trace" />
        <KpiCard label="Alertas" value="4" icon={TriangleAlert} tone="warning" />
      </section>
      <Card className="mt-6">
        <CardContent>
          <Alert title="Controles preparados" tone="success">
            A camada visual ja diferencia sucesso, pendencia, erro e rastreabilidade com tokens semanticos.
          </Alert>
        </CardContent>
      </Card>
    </>
  );
}
