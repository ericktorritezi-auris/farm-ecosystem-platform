import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="border-b bg-card">
        <div className="container flex min-h-[72px] items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Grupo Souyess</p>
            <h1 className="text-xl font-semibold">Plataforma Interna</h1>
          </div>
          <Button variant="outline">Entrar</Button>
        </div>
      </section>

      <section className="container grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-14">
        <div className="flex flex-col justify-center gap-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">v0.1.0</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Gestao de Especificacoes Funcionais
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Base modular para cadastrar, versionar, auditar, aprovar e documentar especificacoes dos
              sistemas tributarios municipais do ecossistema Souyess.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>
              Acessar modulo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary">
              <ShieldCheck className="h-4 w-4" />
              Governanca preparada
            </Button>
          </div>
        </div>

        <div className="grid gap-3">
          {[
            "Sistemas, modulos e funcionalidades",
            "Particularidades com versionamento",
            "Workflow de aprovacao",
            "Auditoria e logs",
            "Geracao documental DOCX"
          ].map((label) => (
            <div key={label} className="rounded-lg border bg-card p-4 text-sm font-medium shadow-sm">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-primary" />
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
