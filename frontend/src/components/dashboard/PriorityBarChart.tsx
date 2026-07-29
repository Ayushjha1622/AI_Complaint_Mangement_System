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
import type { PriorityDistribution } from "@/features/dashboard/dashboardTypes";

interface PriorityBarChartProps {
  data: PriorityDistribution[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const COLORS: Record<string, string> = {
  LOW: "#10B981",      // Emerald
  MEDIUM: "#3B82F6",   // Blue
  HIGH: "#F59E0B",     // Amber
  CRITICAL: "#EF4444", // Red
};

export default function PriorityBarChart({ data, loading, error, onRetry }: PriorityBarChartProps) {
  const chartData = data.map((item) => ({
    priority: item.priority.charAt(0).toUpperCase() + item.priority.slice(1).toLowerCase(),
    rawPriority: item.priority.toUpperCase(),
    count: item.count,
  }));

  return (
    <Card className="h-[380px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Complaints by Priority</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Current severity levels</p>
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
              <div className="w-12 bg-slate-200 dark:bg-slate-800 rounded h-1/4" />
              <div className="w-12 bg-slate-200 dark:bg-slate-800 rounded h-3/4" />
              <div className="w-12 bg-slate-200 dark:bg-slate-800 rounded h-1/2" />
              <div className="w-12 bg-slate-200 dark:bg-slate-800 rounded h-5/6" />
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
            No priority data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
              <XAxis
                dataKey="priority"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
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
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.rawPriority] || "#3B82F6"}
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
