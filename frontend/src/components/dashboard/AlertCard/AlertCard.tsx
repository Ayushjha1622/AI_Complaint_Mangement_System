import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";

export default function AlertCard() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Critical Alerts
      </h2>

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              High Risk Complaint
            </h3>

            <Badge color="red">Critical</Badge>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Complaint CMP-1003 requires immediate investigation.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              CAPA Pending
            </h3>

            <Badge color="yellow">Pending</Badge>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            4 corrective actions are awaiting approval.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Escalation Required
            </h3>

            <Badge color="blue">Review</Badge>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Complaint age exceeded SLA threshold.
          </p>
        </div>
      </div>
    </Card>
  );
}
