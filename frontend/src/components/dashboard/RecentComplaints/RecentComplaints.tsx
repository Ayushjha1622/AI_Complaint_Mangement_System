import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";

import { recentComplaints } from "@/data/dashboard";

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

export default function RecentComplaints() {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Complaints
        </h2>

        <button className="text-blue-600 hover:underline text-sm">
          View All
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-3 font-semibold text-gray-500">ID</th>
              <th className="pb-3 font-semibold text-gray-500">Customer</th>
              <th className="pb-3 font-semibold text-gray-500">Product</th>
              <th className="pb-3 font-semibold text-gray-500">Priority</th>
              <th className="pb-3 font-semibold text-gray-500">Status</th>
              <th className="pb-3 font-semibold text-gray-500">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentComplaints.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 font-mono text-xs font-semibold text-blue-600">
                  {item.id}
                </td>

                <td className="py-4 font-medium">{item.customer}</td>

                <td className="py-4 text-gray-600">{item.product}</td>

                <td className="py-4">
                  <Badge color={priorityColor(item.priority) as "red" | "yellow" | "blue" | "green"}>
                    {item.priority}
                  </Badge>
                </td>

                <td className="py-4">
                  <Badge color={statusColor(item.status) as "red" | "yellow" | "blue" | "green"}>
                    {item.status}
                  </Badge>
                </td>

                <td className="py-4 text-gray-500">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
