import type { SelectHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  className,
  children,
  ...props
}: Props) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-xl border border-slate-300",
        "px-4 py-2 outline-none",
        "focus:ring-2 focus:ring-indigo-500",
        className
      )}
    >
      {children}
    </select>
  );
}