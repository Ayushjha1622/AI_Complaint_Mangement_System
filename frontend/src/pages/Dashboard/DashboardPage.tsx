import {
  ClipboardList,
  TriangleAlert,
  CircleCheckBig,
  Clock3,
} from "lucide-react";

import MetricCard from "@/components/dashboard/MetricCard";
import TrendChart from "@/components/dashboard/TrendChart";
import StatusChart from "@/components/dashboard/StatusChart";
import RecentComplaints from "@/components/dashboard/RecentComplaints";
import InsightCard from "@/components/dashboard/InsightCard";
import QuickActions from "@/components/dashboard/QuickActions";
import AlertCard from "@/components/dashboard/AlertCard";

import { metrics } from "@/data/dashboard";

export default function DashboardPage() {
  const icons = [
    <ClipboardList size={24} />,
    <TriangleAlert size={24} />,
    <CircleCheckBig size={24} />,
    <Clock3 size={24} />,
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-1 text-gray-500">
          Complaint Management Overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={icons[index]}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TrendChart />
        </div>

        <StatusChart />
      </div>

      {/* Recent Complaints + AI Insights */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentComplaints />
        </div>

        <InsightCard />
      </div>

      {/* Quick Actions + Critical Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />

        <AlertCard />
      </div>

    </div>
  );
}