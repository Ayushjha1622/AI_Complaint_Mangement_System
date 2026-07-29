import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "@/components/ui/Card/Card";
import type { StatusDistribution } from "@/features/dashboard/dashboardTypes";

interface StatusPieChartProps {
  data: StatusDistribution[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const COLORS = [
  "#3B82F6", // Open: Blue
  "#F59E0B", // In Progress: Amber
  "#10B981", // Resolved: Emerald
  "#8B5CF6", // Under Review: Purple
  "#6B7280", // Closed: Gray
];

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function StatusPieChart({ data, loading, error, onRetry }: StatusPieChartProps) {
  const chartData = data.map((item) => ({
    name: formatStatus(item.status),
    value: item.count,
  }));

  return (
    <Card className="h-[380px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Complaints by Status</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Current workflow breakdown</p>
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
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 animate-pulse">
            <div className="h-40 w-40 rounded-full border-12 border-slate-200 dark:border-slate-800" />
            <div className="flex space-x-4">
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ) : chartData.length === 0 ? (

          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
            No status data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                cx="50%"
                cy="45%"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    className="stroke-white dark:stroke-slate-900 stroke-2"
                  />
                ))}
              </Pie>
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
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
