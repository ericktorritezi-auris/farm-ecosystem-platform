import type { LucideIcon } from "lucide-react";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/utils/cn";

type KpiCardProps = {
  label: string;
  value: string;
  trend?: string;
  icon?: LucideIcon;
  tone?: "default" | "success" | "warning" | "trace";
};

const toneClass = {
  default: "text-specgov-cobalt",
  success: "text-specgov-emerald",
  warning: "text-specgov-amber",
  trace: "text-specgov-cyan"
};

export function KpiCard({ label, value, trend, icon: Icon, tone = "default" }: KpiCardProps) {
  return (
    <Card className="border-t-[1.5px] border-t-specgov-cobalt p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="sg-label">{label}</p>
          <p className="mt-2 text-[1.625rem] font-semibold leading-8 tracking-[-0.012em] text-specgov-navy dark:text-specgov-dark-text">
            {value}
          </p>
          {trend ? <p className="mt-1 text-[12px] leading-5 text-specgov-slate dark:text-specgov-slate-muted">{trend}</p> : null}
        </div>
        {Icon ? <Icon className={cn("size-5 stroke-[1.5] opacity-90", toneClass[tone])} aria-hidden /> : null}
      </div>
    </Card>
  );
}
