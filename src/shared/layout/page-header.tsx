import { cn } from "@/shared/utils/cn";

type PageHeaderProps = {
  overline: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({ overline, title, description, actions, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", className)}>
      <div className="max-w-3xl">
        <p className="sg-overline">{overline}</p>
        <h1 className="mt-2 text-h1">{title}</h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-specgov-slate dark:text-specgov-slate-muted">
          {description}
        </p>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}
