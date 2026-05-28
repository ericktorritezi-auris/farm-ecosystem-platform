import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-sg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 [&_svg]:size-4 [&_svg]:stroke-[1.5]",
  {
    variants: {
      variant: {
        default:
          "bg-specgov-cobalt text-white shadow-sg-button hover:bg-specgov-cobalt-hover hover:shadow-sg-card active:bg-specgov-cobalt-active active:shadow-none",
        secondary:
          "border border-specgov-border-light bg-specgov-surface-0 text-specgov-navy shadow-sm hover:border-specgov-input-border hover:bg-specgov-surface-2 dark:border-specgov-dark-border dark:bg-specgov-dark-surface dark:text-specgov-dark-text",
        outline:
          "border border-specgov-input-border bg-background text-specgov-navy hover:border-specgov-slate-muted hover:bg-specgov-surface-2 dark:text-specgov-dark-text",
        ghost:
          "text-specgov-slate hover:bg-specgov-surface-2/80 hover:text-specgov-navy dark:text-specgov-slate-muted dark:hover:bg-specgov-dark-surface dark:hover:text-specgov-dark-text",
        destructive: "bg-specgov-red text-white shadow-sm hover:bg-red-700 active:bg-red-800"
      },
      size: {
        sm: "h-9 min-w-9 px-3 text-xs",
        md: "h-11 px-5",
        lg: "h-12 px-6",
        icon: "h-10 w-10 min-w-10 px-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, className }))} {...props} />;
}
