import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] text-specgov-slate-muted">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1">
          {index > 0 ? <ChevronRight className="size-3.5 stroke-[1.5]" aria-hidden /> : null}
          {item.href ? (
            <Link
              className="transition-colors duration-sg hover:text-specgov-cobalt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href={item.href}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-specgov-slate dark:text-specgov-dark-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
