import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Card from "@/components/ui/Card/Card";
import type { CategoryDistribution } from "@/features/dashboard/dashboardTypes";

interface CategoryBarChartProps {
  data: CategoryDistribution[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#6366F1", // Indigo
  "#EC4899", // Pink
  "#8B5CF6", // Purple
];

const formatCategory = (cat: string) => {
  return cat
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function CategoryBarChart({ data, loading, error, onRetry }: CategoryBarChartProps) {
  const chartData = data.map((item) => ({
    category: formatCategory(item.category),
    count: item.count,
  }));

  return (
    <Card className="h-[380px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Complaints by Category</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Products or services issues distribution</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 relative mt-4">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <p className="text-sm text-red-500 mb-2">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        ) : loading ? (
          <div className="absolute inset-0 flex flex-col justify-end space-y-4 animate-pulse p-4">
            <div className="flex items-end justify-between space-x-4 h-48">
              <div className="w-12 bg-slate-200 dark:bg-slate-800 rounded h-1/3" />
              <div className="w-12 bg-slate-200 dark:bg-slate-800 rounded h-1/2" />
              <div className="w-12 bg-slate-200 dark:bg-slate-800 rounded h-2/3" />
              <div className="w-12 bg-slate-200 dark:bg-slate-800 rounded h-1/4" />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <div className="w-8 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-8 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-8 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-8 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
            No category data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(226, 232, 240, 0.2)" }}
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.96)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={45}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
