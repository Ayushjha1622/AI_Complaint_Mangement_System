import Card from "@/components/ui/Card/Card";

export const STATUS_STEPS = [
  "Open",
  "Assigned",
  "Investigating",
  "Root Cause",
  "CAPA",
  "Closed",
] as const;

export type StepStatus = typeof STATUS_STEPS[number];

interface Props {
  currentStatus: StepStatus;
}

export default function StatusStepper({ currentStatus }: Props) {
  const currentStep = Math.max(0, STATUS_STEPS.indexOf(currentStatus));

  return (
    <Card>
      <h2 className="mb-8 text-xl font-semibold text-slate-900">
        Complaint Progress
      </h2>

      <div className="flex flex-wrap items-center gap-4">
        {STATUS_STEPS.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                index <= currentStep
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {index + 1}
            </div>

            <span className="ml-3 font-medium text-slate-800">{step}</span>

            {index !== STATUS_STEPS.length - 1 && (
              <div
                className={`mx-4 h-1 w-12 rounded transition-colors ${
                  index < currentStep ? "bg-indigo-600" : "bg-slate-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
