import Card from "@/components/ui/Card/Card";
import type { BackendTimelineItem as TimelineEvent } from "@/features/complaints/complaintDetailsService";

interface ComplaintTimelineProps {
  items: TimelineEvent[];
  loading?: boolean;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getEventLabel(item: TimelineEvent): string {
  if (item.action === "CREATED") return "Complaint Created";
  if (item.action === "ASSIGNED") {
    return item.new_value ? `Assigned to investigator` : "Assignment removed";
  }
  if (item.action === "STATUS_CHANGED") {
    const from = item.old_value?.replace("_", " ") ?? "—";
    const to = item.new_value?.replace("_", " ") ?? "—";
    return `Status changed: ${from} → ${to}`;
  }
  if (item.action === "UPDATED") {
    const field = item.field_name ?? "field";
    return `${field} updated`;
  }
  return item.action;
}

function getEventIcon(item: TimelineEvent): string {
  if (item.action === "CREATED") return "🆕";
  if (item.action === "ASSIGNED") return "👤";
  if (item.action === "STATUS_CHANGED") return "🔄";
  return "✏️";
}

export default function ComplaintTimeline({ items, loading }: ComplaintTimelineProps) {
  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Activity Timeline</h3>

      <div className="relative min-h-[200px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            No activities recorded yet
          </div>
        ) : (
          <div className="flow-root">
            <ul className="-mb-8">
              {items.map((item, idx) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {idx !== items.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-slate-800"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ring-8 ring-white dark:ring-slate-900 text-sm">
                          {getEventIcon(item)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-850 dark:text-slate-200">
                            {getEventLabel(item)}
                          </p>
                          {item.action === "STATUS_CHANGED" && item.old_value && item.new_value && (
                            <div className="mt-1 flex items-center gap-1.5 text-xs">
                              <span className="px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                {item.old_value.replace(/_/g, " ")}
                              </span>
                              <span className="text-slate-400">→</span>
                              <span className="px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                {item.new_value.replace(/_/g, " ")}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-right text-xs whitespace-nowrap text-slate-400 dark:text-slate-500">
                          <time>{formatDate(item.created_at)}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
