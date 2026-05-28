import { GitBranch } from "lucide-react";
import { PageHeader } from "@/shared/layout/page-header";
import { Card, CardContent, EmptyState, StatusIndicator } from "@/shared/ui";

export default function RastreabilidadePage() {
  return (
    <>
      <PageHeader
        overline="RT"
        title="Rastreabilidade"
        description="Mapa ortogonal de dependencias, origem de requisitos, impactos e relacionamentos funcionais."
      />
      <Card>
        <CardContent>
          <EmptyState
            icon={GitBranch}
            title="Dependency map preparado"
            description="O scaffold visual segue a diretriz do manual: upstream a esquerda, item selecionado ao centro e downstream a direita."
            action="Mapear requisito"
          />
          <div className="mt-4 flex flex-wrap gap-4">
            <StatusIndicator tone="trace" label="Vinculo rastreavel" />
            <StatusIndicator tone="pending" label="Dependencia pendente" />
            <StatusIndicator tone="critical" label="Impacto critico" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
