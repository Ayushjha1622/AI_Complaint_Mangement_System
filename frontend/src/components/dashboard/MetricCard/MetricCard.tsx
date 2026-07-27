import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Card from "@/components/ui/Card/Card";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ReactNode;
}

export default function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
}: MetricCardProps) {
  const isPositive = trend === "up";

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          {icon}
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            isPositive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {change}%
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className="mt-2 text-3xl font-bold">{value}</h2>
      </div>
    </Card>
  );
}
