import { cn } from "@/shared/utils/cn";

type StatusTone = "approved" | "review" | "pending" | "critical" | "trace";

const toneClass: Record<StatusTone, string> = {
  approved: "bg-specgov-emerald",
  review: "bg-specgov-amber",
  pending: "bg-specgov-slate-muted",
  critical: "bg-specgov-red",
  trace: "bg-specgov-cyan"
};

export function StatusIndicator({ label, tone }: { label: string; tone: StatusTone }) {
  return (
    <span className="flex items-center gap-2 text-sm text-specgov-slate dark:text-specgov-slate-muted">
      <span className={cn("size-2 rounded-full", toneClass[tone])} aria-hidden />
      {label}
    </span>
  );
}
