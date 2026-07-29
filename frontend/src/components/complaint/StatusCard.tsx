import { useState, useEffect } from "react";
import Card from "@/components/ui/Card/Card";

interface StatusCardProps {
  currentStatus: string;
  updating: boolean;
  onUpdateStatus: (status: string) => void;
}

const ALL_STATUSES = ["OPEN", "IN_PROGRESS", "UNDER_REVIEW", "RESOLVED", "CLOSED"] as const;

const STATUS_LABELS: Record<string, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  UNDER_REVIEW: "Under Review",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

export default function StatusCard({
  currentStatus,
  updating,
  onUpdateStatus,
}: StatusCardProps) {
  const [selected, setSelected] = useState(currentStatus);

  useEffect(() => {
    setSelected(currentStatus);
  }, [currentStatus]);

  const handleUpdate = () => {
    if (!selected) return;
    onUpdateStatus(selected);
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Status Management</h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Update the current resolution status.
      </p>

      <div className="mt-4 space-y-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          disabled={updating}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2.5 text-sm text-slate-855 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <button
          onClick={handleUpdate}
          disabled={selected === currentStatus || updating}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors duration-200"
        >
          {updating ? "Updating…" : "Update Status"}
        </button>
      </div>
    </Card>
  );
}
