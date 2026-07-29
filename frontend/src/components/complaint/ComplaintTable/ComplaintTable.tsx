import Badge from "@/components/ui/Badge/Badge";
import Card from "@/components/ui/Card/Card";
import type { Complaint } from "@/data/complaints";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  complaints: Complaint[];
  onView?: (complaint: Complaint) => void;
  onRowClick?: (complaint: Complaint) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (column: string) => void;
}

const priorityColor = (priority: Complaint["priority"]): "red" | "yellow" | "blue" | "green" => {
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
};

const statusColor = (status: Complaint["status"]): "red" | "yellow" | "blue" | "green" => {
  switch (status) {
    case "Resolved":
      return "green";
    case "In Progress":
      return "blue";
    default:
      return "yellow";
  }
};

export default function ComplaintTable({
  complaints,
  onView,
  onRowClick,
  sortBy,
  sortOrder,
  onSort,
}: Props) {
  const renderSortIcon = (column: string) => {
    if (!onSort) return null;
    if (sortBy !== column) {
      return <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-indigo-600" />
    ) : (
      <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-indigo-600" />
    );
  };

  const handleSort = (column: string) => {
    if (onSort) onSort(column);
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th 
                className="px-4 py-3 cursor-pointer select-none group hover:bg-slate-100/50 transition-colors"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  ID {renderSortIcon("id")}
                </div>
              </th>
              <th 
                className="px-4 py-3 cursor-pointer select-none group hover:bg-slate-100/50 transition-colors"
                onClick={() => handleSort("customer")}
              >
                <div className="flex items-center">
                  Customer {renderSortIcon("customer")}
                </div>
              </th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th 
                className="px-4 py-3 cursor-pointer select-none group hover:bg-slate-100/50 transition-colors"
                onClick={() => handleSort("priority")}
              >
                <div className="flex items-center">
                  Priority {renderSortIcon("priority")}
                </div>
              </th>
              <th 
                className="px-4 py-3 cursor-pointer select-none group hover:bg-slate-100/50 transition-colors"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status {renderSortIcon("status")}
                </div>
              </th>
              <th className="px-4 py-3">Assigned</th>
              <th 
                className="px-4 py-3 cursor-pointer select-none group hover:bg-slate-100/50 transition-colors"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center">
                  Created {renderSortIcon("createdAt")}
                </div>
              </th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => onRowClick?.(complaint)}
              >
                <td className="px-4 py-4 font-mono font-medium text-indigo-600">
                  {complaint.id}
                </td>

                <td className="px-4 py-4 font-medium text-slate-800">
                  {complaint.customer}
                </td>

                <td className="px-4 py-4 text-slate-600">
                  {complaint.product}
                </td>

                <td className="px-4 py-4 text-slate-600">
                  {complaint.category}
                </td>

                <td className="px-4 py-4">
                  <Badge color={priorityColor(complaint.priority)}>
                    {complaint.priority}
                  </Badge>
                </td>

                <td className="px-4 py-4">
                  <Badge color={statusColor(complaint.status)}>
                    {complaint.status}
                  </Badge>
                </td>

                <td className="px-4 py-4 text-slate-600">
                  {complaint.assignedTo}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {complaint.createdAt}
                </td>

                <td className="px-4 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onView?.(complaint);
                    }}
                    className="rounded-lg bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {complaints.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="py-10 text-center text-slate-500"
                >
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
