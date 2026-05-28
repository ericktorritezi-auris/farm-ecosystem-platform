import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-10 w-full appearance-none rounded-md border border-specgov-input-border bg-specgov-surface-0 px-3 pr-9 text-[13px] text-specgov-navy transition-[border-color,box-shadow,background-color] duration-sg hover:border-specgov-slate-muted focus:border-specgov-cobalt focus:outline-none focus:ring-2 focus:ring-specgov-cobalt/15 disabled:cursor-not-allowed disabled:bg-specgov-surface-2 disabled:opacity-60 dark:border-specgov-dark-border dark:bg-specgov-dark-surface dark:text-specgov-dark-text",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 stroke-[1.5] text-specgov-slate-muted" />
    </div>
  );
});
Select.displayName = "Select";
