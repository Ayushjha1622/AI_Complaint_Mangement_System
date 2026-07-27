import Card from "@/components/ui/Card/Card";

import { activityLog } from "@/data/complaintDetails";

export default function ActivityLog() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Activity Log
      </h2>

      <div className="space-y-5">
        {activityLog.map((activity) => (
          <div
            key={activity.id}
            className="flex justify-between border-b border-slate-100 pb-3"
          >
            <div>
              <h3 className="font-medium text-slate-800">
                {activity.action}
              </h3>

              <p className="text-sm text-gray-500">
                {activity.user}
              </p>
            </div>

            <span className="text-sm text-gray-400 font-mono">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
