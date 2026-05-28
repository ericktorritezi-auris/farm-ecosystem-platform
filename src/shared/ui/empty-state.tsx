import type { LucideIcon } from "lucide-react";
import { FileSearch } from "lucide-react";
import { Button } from "@/shared/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: string;
  icon?: LucideIcon;
};

export function EmptyState({ title, description, action, icon: Icon = FileSearch }: EmptyStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-specgov-border-light/90 bg-specgov-surface-0/78 p-8 text-center dark:border-specgov-dark-border dark:bg-specgov-dark-surface">
      <Icon className="size-8 stroke-[1.5] text-specgov-cobalt opacity-90" aria-hidden />
      <h2 className="mt-4 text-h2">{title}</h2>
      <p className="mt-2 max-w-md text-[13px] leading-6 text-specgov-slate dark:text-specgov-slate-muted">
        {description}
      </p>
      {action ? <Button className="mt-4">{action}</Button> : null}
    </div>
  );
}
