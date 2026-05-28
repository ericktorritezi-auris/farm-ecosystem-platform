import { FileDown } from "lucide-react";
import { PageHeader } from "@/shared/layout/page-header";
import { Button, Card, CardContent, EmptyState } from "@/shared/ui";

export default function DocumentacaoPage() {
  return (
    <>
      <PageHeader
        overline="DM"
        title="Documentacao"
        description="Geracao futura de documentos DOCX filtrados por sistema, modulo, funcionalidade e exigibilidade em POC."
        actions={<Button><FileDown className="size-4" />Preparar DOCX</Button>}
      />
      <Card>
        <CardContent>
          <EmptyState
            icon={FileDown}
            title="Gerador documental aguardando regra funcional"
            description="A arquitetura visual esta pronta para acionar servicos de documento sem acoplar a geracao ao layout."
          />
        </CardContent>
      </Card>
    </>
  );
}
