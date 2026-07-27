import type { InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-slate-300 px-4 py-2 outline-none",
        "focus:ring-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    />
  );
}