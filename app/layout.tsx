import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grupo Souyess | Plataforma Interna",
  description: "Plataforma modular interna para o Departamento Farm / Negocios / Atendimento Especializado."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
