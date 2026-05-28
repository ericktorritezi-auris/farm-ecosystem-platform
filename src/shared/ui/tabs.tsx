import { cn } from "@/shared/utils/cn";

type TabItem = {
  label: string;
  active?: boolean;
};

export function Tabs({ items }: { items: TabItem[] }) {
  return (
    <div className="flex gap-1 border-b border-border/85" role="tablist">
      {items.map((item) => (
        <button
          key={item.label}
          className={cn(
            "h-10 border-b-2 border-transparent px-3 text-[13px] font-medium text-specgov-slate-muted transition-colors duration-sg hover:text-specgov-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-specgov-slate-muted dark:hover:text-specgov-dark-text",
            item.active && "border-specgov-cobalt text-specgov-cobalt"
          )}
          role="tab"
          aria-selected={item.active}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
