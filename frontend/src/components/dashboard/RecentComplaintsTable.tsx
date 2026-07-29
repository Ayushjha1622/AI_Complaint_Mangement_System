import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";
import { Link } from "react-router-dom";
import type { Complaint } from "@/types/complaint";

interface RecentComplaintsTableProps {
  data: Complaint[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

function priorityColor(priority: string) {
  switch (priority) {
    case "Critical":
      return "red";
    case "High":
      return "yellow";
    case "Medium":
      return "blue";
    default:
      return "green";
  }
}

function statusColor(status: string) {
  switch (status) {
    case "Resolved":
      return "green";
    case "In Progress":
      return "blue";
    default:
      return "yellow";
  }
}

export default function RecentComplaintsTable({ data, loading, error, onRetry }: RecentComplaintsTableProps) {
  return (
    <Card className="h-full flex flex-col justify-between">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Complaints</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Latest active requests</p>
        </div>

        <Link to="/complaints" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold">
          View All
        </Link>
      </div>

      <div className="overflow-auto flex-1 relative min-h-[220px]">
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
          <div className="absolute inset-0 space-y-4 animate-pulse p-2">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-10 bg-slate-100 dark:bg-slate-900/60 rounded w-full" />
            <div className="h-10 bg-slate-100 dark:bg-slate-900/60 rounded w-full" />
            <div className="h-10 bg-slate-100 dark:bg-slate-900/60 rounded w-full" />
            <div className="h-10 bg-slate-100 dark:bg-slate-900/60 rounded w-full" />
          </div>
        ) : data.length === 0 ? (

          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
            No recent complaints found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 text-left">
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">ID</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Customer</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Product / Title</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Priority</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Status</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 dark:border-slate-800/60 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 font-mono text-xs font-semibold">
                    <Link
                      to={`/complaints/${item.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {item.id}
                    </Link>
                  </td>

                  <td className="py-4 font-medium text-gray-800 dark:text-gray-200">{item.customer}</td>

                  <td className="py-4 text-gray-600 dark:text-gray-400 max-w-[200px] truncate">{item.product}</td>

                  <td className="py-4">
                    <Badge color={priorityColor(item.priority) as any}>
                      {item.priority}
                    </Badge>
                  </td>

                  <td className="py-4">
                    <Badge color={statusColor(item.status) as any}>
                      {item.status}
                    </Badge>
                  </td>

                  <td className="py-4 text-gray-500 dark:text-gray-400">{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}
