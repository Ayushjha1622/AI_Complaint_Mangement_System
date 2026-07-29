import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchDashboard } from "@/features/dashboard/dashboardSlice";
import {
  ClipboardList,
  Clock3,
  Activity,
  CircleCheckBig,
  RefreshCw,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import StatusPieChart from "@/components/dashboard/StatusPieChart";
import PriorityBarChart from "@/components/dashboard/PriorityBarChart";
import CategoryBarChart from "@/components/dashboard/CategoryBarChart";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendChart";
import RecentComplaintsTable from "@/components/dashboard/RecentComplaintsTable";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.dashboard);

  const fetchAllData = () => {
    dispatch(fetchDashboard());
  };

  useEffect(() => {
    fetchAllData();

    // 5-minute auto-refresh (300,000 ms)
    const interval = setInterval(() => {
      fetchAllData();
    }, 300000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const stats = data?.summary || null;
  const activeCount = stats ? (stats.in_progress || 0) + (stats.under_review || 0) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Complaint Management Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Real-time operations center overview
          </p>
        </div>

        <button
          onClick={fetchAllData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 rounded-xl text-sm font-semibold transition-colors duration-200"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4 rounded-xl flex items-center justify-between">
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</p>
          <button
            onClick={fetchAllData}
            className="text-xs bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Complaints"
          value={stats ? stats.total_complaints : 0}
          icon={<ClipboardList size={22} />}
          color="blue"
          description="Accumulated cases"
          loading={loading}
        />
        <StatCard
          title="Open Complaints"
          value={stats ? stats.open : 0}
          icon={<Clock3 size={22} />}
          color="amber"
          description="Pending review"
          loading={loading}
        />
        <StatCard
          title="Active Complaints"
          value={activeCount}
          icon={<Activity size={22} />}
          color="blue"
          description="In Progress & Under Review"
          loading={loading}
        />
        <StatCard
          title="Closed Complaints"
          value={stats ? stats.closed : 0}
          icon={<CircleCheckBig size={22} />}
          color="green"
          description="Successfully resolved"
          loading={loading}
        />
      </div>

      {/* Distributions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <StatusPieChart
          data={data?.status_distribution || []}
          loading={loading}
          error={error}
          onRetry={fetchAllData}
        />
        <PriorityBarChart
          data={data?.priority_distribution || []}
          loading={loading}
          error={error}
          onRetry={fetchAllData}
        />
        <CategoryBarChart
          data={data?.category_distribution || []}
          loading={loading}
          error={error}
          onRetry={fetchAllData}
        />
      </div>

      {/* Monthly Trend Chart */}
      <div className="w-full">
        <MonthlyTrendChart
          data={data?.monthly_trend || []}
          loading={loading}
          error={error}
          onRetry={fetchAllData}
        />
      </div>

      {/* Recent Complaints Table */}
      <div className="w-full">
        <RecentComplaintsTable
          data={data?.recent_complaints || []}
          loading={loading}
          error={error}
          onRetry={fetchAllData}
        />
      </div>
    </div>
  );
}