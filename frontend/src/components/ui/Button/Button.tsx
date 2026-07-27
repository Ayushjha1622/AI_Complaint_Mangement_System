import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white",

    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-900",

    outline:
      "border border-slate-300 hover:bg-slate-50",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}