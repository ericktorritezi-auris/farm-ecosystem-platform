import * as React from "react";
import { cn } from "@/shared/utils/cn";

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-specgov-border-light/90 bg-specgov-surface-0 dark:border-specgov-dark-border dark:bg-specgov-dark-surface">
      <table className={cn("w-full border-collapse text-left text-[13px]", className)} {...props} />
    </div>
  );
}

export function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className="bg-[#17265b] text-white dark:bg-specgov-dark-nav [&_tr]:!bg-[#17265b] [&_tr]:hover:!bg-[#17265b] dark:[&_tr]:!bg-specgov-dark-nav dark:[&_tr]:hover:!bg-specgov-dark-nav"
      {...props}
    />
  );
}

export function TBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-specgov-border-light/80 dark:divide-specgov-dark-border", className)} {...props} />;
}

export function TR({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "transition-colors duration-sg odd:bg-specgov-surface-0 even:bg-specgov-surface-1/70 hover:bg-specgov-cobalt-tint/55 dark:odd:bg-specgov-dark-surface dark:even:bg-specgov-dark-slate/55 dark:hover:bg-specgov-cobalt/10",
        className
      )}
      {...props}
    />
  );
}

export function TH({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn("h-10 px-4 text-[11px] font-semibold uppercase tracking-[0.075em] text-white/92", className)}
      {...props}
    />
  );
}

export function TD({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-4 py-3.5 leading-6 text-specgov-slate dark:text-specgov-slate-muted", className)} {...props} />;
}
