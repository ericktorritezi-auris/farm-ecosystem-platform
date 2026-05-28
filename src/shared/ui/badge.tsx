import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium leading-5 tracking-[0.01em] transition-colors duration-sg",
  {
    variants: {
      tone: {
        default: "border-specgov-border-light bg-specgov-surface-2/80 text-specgov-slate",
        approved: "border-emerald-200/80 bg-specgov-emerald-tint text-specgov-emerald",
        review: "border-amber-200/80 bg-specgov-amber-tint text-specgov-amber",
        pending: "border-specgov-border-light bg-specgov-surface-1 text-specgov-slate",
        published: "border-blue-200/80 bg-specgov-cobalt-tint text-specgov-cobalt",
        archived: "border-slate-200/80 bg-slate-100/80 text-slate-600",
        critical: "border-red-200/80 bg-specgov-red-tint text-specgov-red"
      }
    },
    defaultVariants: {
      tone: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}
