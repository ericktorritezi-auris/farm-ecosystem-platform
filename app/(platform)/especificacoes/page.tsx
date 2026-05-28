import { Filter, Plus } from "lucide-react";
import { PageHeader } from "@/shared/layout/page-header";
import { Badge, Button, Card, CardContent, SearchInput, Table, TBody, TD, TH, THead, TR } from "@/shared/ui";

const specs = [
  ["EF-2026-001", "Sistema tributario", "IPTU", "Calculo progressivo", "Em revisao"],
  ["EF-2026-014", "Divida ativa", "Parcelamento", "Renegociacao municipal", "Aprovado"],
  ["EF-2026-028", "ITBI", "Declaracao", "Validacao cartorial", "Rascunho"]
];

export default function EspecificacoesPage() {
  return (
    <>
      <PageHeader
        overline="EF"
        title="Especificacoes"
        description="Cadastro estrutural de sistemas, modulos, funcionalidades e particularidades funcionais."
        actions={
          <>
            <Button variant="secondary"><Filter className="size-4" />Filtros</Button>
            <Button><Plus className="size-4" />Nova</Button>
          </>
        }
      />
      <Card>
        <CardContent className="space-y-4">
          <SearchInput placeholder="Buscar por codigo, sistema, modulo ou funcionalidade" />
          <Table>
            <THead>
              <TR><TH>Codigo</TH><TH>Sistema</TH><TH>Modulo</TH><TH>Funcionalidade</TH><TH>Status</TH></TR>
            </THead>
            <TBody>
              {specs.map(([code, system, module, feature, status]) => (
                <TR key={code}>
                  <TD className="font-mono text-code text-specgov-navy dark:text-specgov-dark-text">{code}</TD>
                  <TD>{system}</TD>
                  <TD>{module}</TD>
                  <TD>{feature}</TD>
                  <TD><Badge tone={status === "Aprovado" ? "approved" : status === "Em revisao" ? "review" : "pending"}>{status}</Badge></TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
