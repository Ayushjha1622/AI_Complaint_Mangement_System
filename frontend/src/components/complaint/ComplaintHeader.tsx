import Badge from "@/components/ui/Badge/Badge";
import type { BackendComplaint as Complaint } from "@/features/complaints/complaintDetailsService";

interface ComplaintHeaderProps {
  complaint: Complaint;
}

const STATUS_LABELS: Record<string, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  UNDER_REVIEW: "Under Review",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

function statusBadgeColor(status: string): "blue" | "amber" | "green" | "red" {
  switch (status) {
    case "RESOLVED":
    case "CLOSED":
      return "green";
    case "IN_PROGRESS":
    case "UNDER_REVIEW":
      return "blue";
    default:
      return "amber";
  }
}

function priorityBadgeColor(priority: string): "blue" | "amber" | "green" | "red" {
  switch (priority) {
    case "CRITICAL":
      return "red";
    case "HIGH":
      return "amber";
    case "MEDIUM":
      return "blue";
    default:
      return "green";
  }
}

export default function ComplaintHeader({ complaint }: ComplaintHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
      <div>
        <span className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
          {complaint.complaint_number}
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {complaint.title}
        </h1>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        <Badge color={statusBadgeColor(complaint.status)}>
          {STATUS_LABELS[complaint.status] || complaint.status}
        </Badge>
        <Badge color={priorityBadgeColor(complaint.priority)}>
          {complaint.priority}
        </Badge>
      </div>
    </div>
  );
}
