import type { LucideIcon } from "lucide-react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/shared/utils/cn";

type AlertTone = "info" | "success" | "warning" | "error";

const tones: Record<AlertTone, { className: string; icon: LucideIcon }> = {
  info: { className: "border-blue-200/80 bg-specgov-cobalt-tint/75 text-specgov-cobalt", icon: Info },
  success: { className: "border-emerald-200/80 bg-specgov-emerald-tint/80 text-specgov-emerald", icon: CheckCircle2 },
  warning: { className: "border-amber-200/80 bg-specgov-amber-tint/85 text-specgov-amber", icon: TriangleAlert },
  error: { className: "border-red-200/80 bg-specgov-red-tint/85 text-specgov-red", icon: AlertCircle }
};

export function Alert({
  title,
  children,
  tone = "info",
  className
}: {
  title: string;
  children?: React.ReactNode;
  tone?: AlertTone;
  className?: string;
}) {
  const Icon = tones[tone].icon;
  return (
    <div className={cn("rounded-lg border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]", tones[tone].className, className)} role="status">
      <div className="flex gap-3">
        <Icon className="mt-0.5 size-4 shrink-0 stroke-[1.5]" aria-hidden />
        <div>
          <p className="text-sm font-semibold">{title}</p>
          {children ? <div className="mt-1 text-[13px] leading-6 opacity-90">{children}</div> : null}
        </div>
      </div>
    </div>
  );
}
