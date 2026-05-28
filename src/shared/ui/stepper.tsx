import { Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export type StepStatus = "completed" | "active" | "pending";

type StepperItem = {
  title: string;
  description?: string;
  status: StepStatus;
};

const statusClass = {
  completed: "border-specgov-emerald bg-specgov-emerald text-white shadow-[0_0_0_3px_rgba(5,150,105,0.08)]",
  active: "border-specgov-amber bg-specgov-amber text-white shadow-[0_0_0_3px_rgba(217,119,6,0.10)]",
  pending: "border-specgov-border-light bg-specgov-surface-0 text-specgov-slate-muted dark:border-specgov-dark-border dark:bg-specgov-dark-surface"
};

export function Stepper({ items }: { items: StepperItem[] }) {
  return (
    <ol className="space-y-0">
      {items.map((item, index) => (
        <li key={item.title} className="relative grid grid-cols-[24px_1fr] gap-3 pb-5 last:pb-0">
          {index < items.length - 1 ? (
            <span className="absolute left-[11px] top-6 h-full w-px bg-specgov-border-light/85 dark:bg-specgov-dark-border" />
          ) : null}
          <span
            className={cn(
              "relative z-10 flex size-6 items-center justify-center rounded-full border text-xs font-semibold",
              statusClass[item.status]
            )}
          >
            {item.status === "completed" ? <Check className="size-3.5 stroke-[1.5]" /> : index + 1}
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-specgov-navy dark:text-specgov-dark-text">{item.title}</span>
            {item.description ? (
              <span className="mt-1 block text-xs leading-5 text-specgov-slate dark:text-specgov-slate-muted">
                {item.description}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
