"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu, Search, UserCircle } from "lucide-react";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { Button } from "@/shared/ui/button";
import { NavItem } from "@/shared/ui/nav-item";
import { platformNavigation, secondaryNavigation } from "@/shared/layout/navigation";
import { SpecGovLogo } from "@/shared/layout/specgov-logo";
import { cn } from "@/shared/utils/cn";

const pageLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/especificacoes": "Especificacoes",
  "/approvals": "Aprovacoes",
  "/rastreabilidade": "Rastreabilidade",
  "/compliance": "Compliance",
  "/documentacao": "Documentacao",
  "/settings": "Settings"
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentLabel = pageLabels[pathname] ?? "Plataforma";

  return (
    <div className="min-h-screen bg-specgov-surface-1 text-specgov-navy dark:bg-specgov-dark-slate dark:text-specgov-dark-text">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-sidebar border-r border-specgov-border-light/85 bg-specgov-surface-0 shadow-[1px_0_0_rgba(15,30,75,0.02)] dark:border-specgov-dark-border dark:bg-specgov-dark-nav lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-border/80 px-4">
          <SpecGovLogo />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Navegacao principal">
          {platformNavigation.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} icon={item.icon} active={pathname === item.href} />
          ))}
        </nav>
        <div className="border-t border-border/80 px-3 py-4">
          {secondaryNavigation.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} icon={item.icon} disabled={item.disabled} />
          ))}
        </div>
      </aside>

      <div className="lg:pl-sidebar">
        <header className="sticky top-0 z-20 flex h-topbar items-center justify-between border-b border-specgov-border-light/85 bg-specgov-surface-0/96 px-3 backdrop-blur-sm dark:border-specgov-dark-border dark:bg-specgov-dark-nav/96 lg:px-5">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir navegacao">
              <Menu className="size-4" />
            </Button>
            <Breadcrumb items={[{ label: "SpecGov", href: "/dashboard" }, { label: currentLabel }]} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Pesquisar">
              <Search className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notificacoes">
              <Bell className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Usuario">
              <UserCircle className="size-4" />
            </Button>
          </div>
        </header>

        <main className="blueprint-grid min-h-[calc(100vh-48px)] p-4 pb-20 sm:p-6 lg:p-8">{children}</main>

        <nav
          className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-specgov-border-light bg-specgov-surface-0 p-1 dark:border-specgov-dark-border dark:bg-specgov-dark-nav lg:hidden"
          aria-label="Navegacao mobile"
        >
          {platformNavigation.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center gap-1 rounded-md text-[10px] font-medium text-specgov-slate-muted transition-colors duration-sg hover:bg-specgov-surface-2",
                  active && "bg-specgov-cobalt-tint/85 text-specgov-cobalt"
                )}
              >
                <Icon className="size-4 stroke-[1.5]" aria-hidden />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
