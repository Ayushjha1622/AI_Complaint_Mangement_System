import { useState } from "react";
import Card from "@/components/ui/Card/Card";

interface Investigator {
  id: string;
  full_name: string;
  email: string;
}

interface AssignmentCardProps {
  currentAssigneeId: string | null;
  investigators: Investigator[];
  updating: boolean;
  onAssign: (assigneeId: string) => void;
}

export default function AssignmentCard({
  currentAssigneeId,
  investigators,
  updating,
  onAssign,
}: AssignmentCardProps) {
  const [selected, setSelected] = useState(currentAssigneeId || "");

  const handleAssign = () => {
    if (!selected) return;
    onAssign(selected);
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Assignment</h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Assign an investigator to manage this case.
      </p>

      <div className="mt-4 space-y-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          disabled={updating}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2.5 text-sm text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">— Select Investigator —</option>
          {investigators.map((inv) => (
            <option key={inv.id} value={inv.id}>
              {inv.full_name} ({inv.email})
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          disabled={!selected || selected === currentAssigneeId || updating}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors duration-200"
        >
          {updating ? "Assigning…" : "Assign Case"}
        </button>
      </div>
    </Card>
  );
}
