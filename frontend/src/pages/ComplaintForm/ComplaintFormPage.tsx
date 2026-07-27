import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";

export default function ComplaintFormPage() {
  return (
    <div className="p-8">
      <h1 className="mb-2 text-3xl font-bold">
        Log Complaint
      </h1>

      <p className="mb-8 text-slate-500">
        Submit a new customer complaint.
      </p>

      <Card className="max-w-3xl space-y-6">
        <div>
          <label className="mb-2 block font-medium">
            Complaint Title
          </label>

          <Input placeholder="Enter complaint title" />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <Textarea placeholder="Describe the complaint..." />
        </div>

        <div className="flex justify-end">
          <Button>
            Submit Complaint
          </Button>
        </div>
      </Card>
    </div>
  );
}