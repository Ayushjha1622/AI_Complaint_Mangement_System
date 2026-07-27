import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";

import { aiAnalysis } from "@/data/complaintDetails";

export default function AIAnalysis() {
  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          AI Investigation
        </h2>

        <Badge color="blue">
          {aiAnalysis.confidence}% Confidence
        </Badge>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="mb-2 font-semibold text-slate-800">
            AI Summary
          </h3>

          <p className="text-gray-600">
            {aiAnalysis.summary}
          </p>
        </section>

        <section>
          <h3 className="mb-2 font-semibold text-slate-800">
            Root Cause
          </h3>

          <p className="text-gray-600">
            {aiAnalysis.rootCause}
          </p>
        </section>

        <section>
          <h3 className="mb-2 font-semibold text-slate-800">
            Severity
          </h3>

          <Badge color="red">
            {aiAnalysis.severity}
          </Badge>
        </section>
      </div>
    </Card>
  );
}
