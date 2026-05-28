import { X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils/cn";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose?: () => void;
};

export function Modal({ open, title, description, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-specgov-graphite/50 p-4 backdrop-blur-[1px]" role="presentation">
      <section
        className="w-full max-w-lg rounded-lg border border-specgov-border-light bg-specgov-surface-0 shadow-sg-card dark:border-specgov-dark-border dark:bg-specgov-dark-surface"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="flex min-h-topbar items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 id="modal-title" className="text-h2">
              {title}
            </h2>
            {description ? <p className="mt-1 text-[13px] leading-5 text-specgov-slate-muted">{description}</p> : null}
          </div>
          {onClose ? (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar modal">
              <X className="size-4" />
            </Button>
          ) : null}
        </header>
        <div className={cn("p-5")}>{children}</div>
      </section>
    </div>
  );
}
