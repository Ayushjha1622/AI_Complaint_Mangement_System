import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Card from "@/components/ui/Card/Card";
import { complaintStatus } from "@/data/dashboard";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
];

export default function StatusChart() {
  return (
    <Card className="h-[400px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Complaint Status
        </h2>

        <p className="text-sm text-gray-500">
          Current complaint distribution
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={complaintStatus}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={3}
          >
            {complaintStatus.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
