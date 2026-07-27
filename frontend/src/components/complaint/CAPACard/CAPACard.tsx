import Card from "@/components/ui/Card/Card";
import { CheckCircle2 } from "lucide-react";

import { capaRecommendations } from "@/data/complaintDetails";

export default function CAPACard() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        AI Recommended CAPA
      </h2>

      <div className="space-y-4">
        {capaRecommendations.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3"
          >
            <CheckCircle2
              className="mt-1 text-green-600 flex-shrink-0"
              size={20}
            />

            <p className="text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
