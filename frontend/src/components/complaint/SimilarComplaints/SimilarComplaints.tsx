import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";

import { similarComplaints } from "@/data/complaintDetails";

export default function SimilarComplaints() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Similar Complaints
      </h2>

      <div className="space-y-4">
        {similarComplaints.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
          >
            <div>
              <h3 className="font-semibold text-indigo-600">
                {item.id}
              </h3>

              <p className="text-sm text-gray-500">
                {item.product}
              </p>
            </div>

            <Badge color="green">
              {item.similarity}% Match
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
