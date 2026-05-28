import * as React from "react";
import { cn } from "@/shared/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-specgov-input-border bg-specgov-surface-0 px-3 py-2 text-[13px] text-specgov-navy transition-[border-color,box-shadow,background-color] duration-sg placeholder:text-specgov-slate-muted hover:border-specgov-slate-muted focus:border-specgov-cobalt focus:outline-none focus:ring-2 focus:ring-specgov-cobalt/15 disabled:cursor-not-allowed disabled:bg-specgov-surface-2 disabled:opacity-60 dark:border-specgov-dark-border dark:bg-specgov-dark-surface dark:text-specgov-dark-text",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
