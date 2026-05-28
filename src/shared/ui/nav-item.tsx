import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

type NavItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
  disabled?: boolean;
};

export function NavItem({ href, label, icon: Icon, active, disabled }: NavItemProps) {
  const content = (
    <>
      <span
        className={cn(
          "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-xs bg-transparent transition-colors duration-sg",
          active && "bg-specgov-cobalt shadow-[0_0_0_1px_rgba(30,78,216,0.06)]"
        )}
      />
      <Icon className={cn("size-4 shrink-0 stroke-[1.5]", active && "text-specgov-cobalt dark:text-specgov-dark-text")} aria-hidden />
      <span className="truncate">{label}</span>
    </>
  );

  const className = cn(
    "relative flex h-9 items-center gap-3 rounded-md px-3 text-[13px] font-medium text-specgov-slate-muted transition-[background-color,color,box-shadow] duration-sg hover:bg-specgov-surface-2/70 hover:text-specgov-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-slate-400 dark:hover:bg-specgov-dark-surface/70 dark:hover:text-specgov-dark-text",
    active &&
      "bg-specgov-cobalt-tint/85 text-specgov-cobalt shadow-[inset_0_0_0_1px_rgba(30,78,216,0.08)] dark:bg-specgov-cobalt/12 dark:text-specgov-dark-text",
    disabled && "pointer-events-none opacity-50"
  );

  if (disabled) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
