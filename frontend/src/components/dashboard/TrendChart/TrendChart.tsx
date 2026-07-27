import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Card from "@/components/ui/Card/Card";
import { complaintTrend } from "@/data/dashboard";

export default function TrendChart() {
  return (
    <Card className="h-[400px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Complaint Trend</h2>

        <p className="text-sm text-gray-500">
          Monthly complaints vs resolved
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={complaintTrend}
          margin={{ top: 4, right: 16, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gradComplaints" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              fontSize: "13px",
            }}
          />

          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
          />

          <Area
            type="monotone"
            dataKey="complaints"
            name="Complaints"
            stroke="#2563eb"
            strokeWidth={2.5}
            fill="url(#gradComplaints)"
          />

          <Area
            type="monotone"
            dataKey="resolved"
            name="Resolved"
            stroke="#16a34a"
            strokeWidth={2.5}
            fill="url(#gradResolved)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
