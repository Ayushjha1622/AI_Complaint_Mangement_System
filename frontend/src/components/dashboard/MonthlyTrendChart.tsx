import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/ui/Card/Card";
import type { MonthlyTrend } from "@/features/dashboard/dashboardTypes";

interface MonthlyTrendChartProps {
  data: MonthlyTrend[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function MonthlyTrendChart({ data, loading, error, onRetry }: MonthlyTrendChartProps) {

  return (
    <Card className="h-[380px] flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Monthly Complaint Trend</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Incoming complaints volume over time</p>
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
            <div className="h-40 border-b border-l border-slate-200 dark:border-slate-800 relative flex items-end justify-between px-6">
              <div className="absolute inset-x-0 top-1/4 border-t border-slate-100 dark:border-slate-900 border-dashed" />
              <div className="absolute inset-x-0 top-2/4 border-t border-slate-100 dark:border-slate-900 border-dashed" />
              <div className="absolute inset-x-0 top-3/4 border-t border-slate-100 dark:border-slate-900 border-dashed" />
              <div className="h-3 w-3 bg-slate-300 dark:bg-slate-700 rounded-full mb-8 ml-4" />
              <div className="h-3 w-3 bg-slate-300 dark:bg-slate-700 rounded-full mb-16" />
              <div className="h-3 w-3 bg-slate-300 dark:bg-slate-700 rounded-full mb-28" />
              <div className="h-3 w-3 bg-slate-300 dark:bg-slate-700 rounded-full mb-20 mr-4" />
            </div>
            <div className="flex justify-between px-6 text-xs">
              <div className="w-8 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-8 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-8 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-8 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ) : data.length === 0 ? (

          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
            No trend data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
              <XAxis
                dataKey="month"
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
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.96)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                name="Complaints"
                stroke="#6366F1" // Indigo
                strokeWidth={3}
                dot={{ r: 4, stroke: "#6366F1", strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 6, stroke: "#6366F1", strokeWidth: 2, fill: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
