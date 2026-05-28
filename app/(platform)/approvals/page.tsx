import { PageHeader } from "@/shared/layout/page-header";
import { Alert, Button, Card, CardContent, CardHeader, CardTitle, Stepper, Tabs, Textarea } from "@/shared/ui";

export default function ApprovalsPage() {
  return (
    <>
      <PageHeader
        overline="AF"
        title="Aprovacoes"
        description="Fila de revisao tecnica para comparar versoes, registrar pareceres e governar publicacoes."
      />
      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader><CardTitle>Comparativo de versoes</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Tabs items={[{ label: "Antes", active: true }, { label: "Depois" }, { label: "Diff" }]} />
            <Alert title="Alteracao relevante detectada" tone="warning">
              Esta proposta altera descricao funcional e exigibilidade em POC.
            </Alert>
            <Textarea placeholder="Parecer do aprovador" />
            <div className="flex gap-2">
              <Button>Aprovar</Button>
              <Button variant="secondary">Solicitar ajuste</Button>
              <Button variant="destructive">Reprovar</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Fluxo tecnico</CardTitle></CardHeader>
          <CardContent>
            <Stepper
              items={[
                { title: "Proposta criada", description: "Agente editor registrou alteracao.", status: "completed" },
                { title: "Revisao tecnica", description: "Aguardando aprovador responsavel.", status: "active" },
                { title: "Publicacao", description: "Versao final auditada.", status: "pending" }
              ]}
            />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
