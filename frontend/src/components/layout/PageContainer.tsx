import type { ReactNode } from "react";
import { cn } from "@/utils/cn.ts";

type PageContainerProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function PageContainer({
  title,
  description,
  children,
  className,
}: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl p-6", className)}>
      {(title || description) && (
        <div className="mb-6">
          {title ? (
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
      )}
      {children}
    </div>
  );
}
