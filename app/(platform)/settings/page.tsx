import { PageHeader } from "@/shared/layout/page-header";
import { Button, Card, CardContent, Input, Select, Textarea } from "@/shared/ui";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        overline="Core"
        title="Settings"
        description="Parametros institucionais, tema, identidade visual e configuracoes transversais da plataforma."
      />
      <Card>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="sg-label">Nome do produto</span>
            <Input defaultValue="SpecGov" />
          </label>
          <label className="space-y-2">
            <span className="sg-label">Tema padrao</span>
            <Select defaultValue="light">
              <option value="light">Light mode</option>
              <option value="dark">Dark mode</option>
            </Select>
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="sg-label">Assinatura corporativa</span>
            <Textarea defaultValue="GRUPO SOUYESS" />
          </label>
          <div className="md:col-span-2">
            <Button>Salvar parametros</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
