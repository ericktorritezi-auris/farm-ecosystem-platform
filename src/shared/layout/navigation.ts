import {
  BarChart3,
  CheckSquare,
  FileText,
  GitBranch,
  LayoutDashboard,
  ScrollText,
  Settings,
  ShieldCheck
} from "lucide-react";

export const platformNavigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/especificacoes", label: "Especificacoes", icon: FileText },
  { href: "/approvals", label: "Aprovacoes", icon: CheckSquare },
  { href: "/rastreabilidade", label: "Rastreabilidade", icon: GitBranch },
  { href: "/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/documentacao", label: "Documentacao", icon: ScrollText },
  { href: "/settings", label: "Settings", icon: Settings }
] as const;

export const secondaryNavigation = [{ href: "/indicadores", label: "Indicadores", icon: BarChart3, disabled: true }] as const;
