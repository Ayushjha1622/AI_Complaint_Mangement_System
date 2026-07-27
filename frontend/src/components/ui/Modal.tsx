import type { ReactNode } from "react";
import { cn } from "@/utils/cn.ts";
import { Button } from "@/components/ui/Button.tsx";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-lg rounded-lg bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
            {title}
          </h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close modal">
            ×
          </Button>
        </div>
        <div className={cn("px-6 py-4")}>{children}</div>
      </div>
    </div>
  );
}
