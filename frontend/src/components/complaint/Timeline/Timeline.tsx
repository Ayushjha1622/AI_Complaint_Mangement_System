import Card from "@/components/ui/Card/Card";
import { timeline } from "@/data/complaintDetails";
import { CheckCircle2, Circle } from "lucide-react";

export default function Timeline() {
  return (
    <Card>
      <h2 className="mb-8 text-xl font-semibold">
        Investigation Timeline
      </h2>

      <div className="space-y-8">
        {timeline.map((event, index) => (
          <div
            key={event.id}
            className="relative flex gap-4"
          >
            {index !== timeline.length - 1 && (
              <div className="absolute left-3 top-8 h-full w-0.5 bg-gray-200" />
            )}

            <div className="z-10">
              {event.completed ? (
                <CheckCircle2
                  className="text-green-600"
                  size={26}
                />
              ) : (
                <Circle
                  className="text-gray-400"
                  size={26}
                />
              )}
            </div>

            <div>
              <h3 className="font-semibold">
                {event.title}
              </h3>

              <p className="text-sm text-gray-600">
                {event.description}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {event.user}
                {event.date && ` • ${event.date}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
