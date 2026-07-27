import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import { PlusCircle, Upload, FileText, Bot } from "lucide-react";

export default function QuickActions() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4">
        <Button className="flex items-center justify-start gap-2">
          <PlusCircle size={18} />
          New Complaint
        </Button>

        <Button variant="secondary" className="flex items-center justify-start gap-2">
          <Upload size={18} />
          Upload CSV
        </Button>

        <Button variant="secondary" className="flex items-center justify-start gap-2">
          <FileText size={18} />
          Generate Report
        </Button>

        <Button className="flex items-center justify-start gap-2 bg-violet-600 hover:bg-violet-700">
          <Bot size={18} />
          Ask AI Copilot
        </Button>
      </div>
    </Card>
  );
}
