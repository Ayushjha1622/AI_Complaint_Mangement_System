// components/ui/Textarea/Textarea.tsx

import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  className,
  ...props
}: Props) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full rounded-xl border border-slate-300",
        "px-4 py-3 outline-none",
        "focus:ring-2 focus:ring-indigo-500",
        "resize-none",
        className
      )}
    />
  );
}