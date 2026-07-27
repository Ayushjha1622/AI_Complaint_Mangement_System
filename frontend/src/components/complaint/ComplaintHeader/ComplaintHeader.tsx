import Badge from "@/components/ui/Badge/Badge";
import Card from "@/components/ui/Card/Card";
import type { ComplaintDetails } from "@/data/complaintDetails";

interface Props {
  complaint: ComplaintDetails;
}

function priorityColor(priority: string): "red" | "yellow" | "blue" | "green" {
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

function statusColor(status: string): "red" | "yellow" | "blue" | "green" {
  switch (status) {
    case "Resolved":
      return "green";
    case "Investigating":
      return "blue";
    default:
      return "yellow";
  }
}

export default function ComplaintHeader({ complaint }: Props) {
  return (
    <Card>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Complaint {complaint.id}
          </h1>

          <p className="mt-2 text-gray-500">
            Created on {complaint.createdAt}
          </p>
        </div>

        <div className="flex gap-3">
          <Badge color={priorityColor(complaint.priority)}>
            {complaint.priority}
          </Badge>

          <Badge color={statusColor(complaint.status)}>
            {complaint.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
