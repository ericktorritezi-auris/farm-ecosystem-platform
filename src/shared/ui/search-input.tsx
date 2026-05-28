import { Search } from "lucide-react";
import { Input, type InputProps } from "@/shared/ui/input";
import { cn } from "@/shared/utils/cn";

export function SearchInput({ className, ...props }: InputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 stroke-[1.5] text-specgov-slate-muted" />
      <Input className="pl-9" type="search" {...props} />
    </div>
  );
}
