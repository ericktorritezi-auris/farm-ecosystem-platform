import * as React from "react";
import { cn } from "@/shared/utils/cn";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "rounded-lg border border-specgov-border-light/90 bg-specgov-surface-0 shadow-[0_1px_2px_rgba(15,30,75,0.035)] transition-[border-color,box-shadow] duration-sg hover:border-specgov-input-border hover:shadow-sg-card dark:border-specgov-dark-border dark:bg-specgov-dark-surface",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-border px-5 py-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-h2 font-semibold", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
