import { PageContainer } from "@/components/layout/PageContainer.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { Input } from "@/components/ui/Input/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card";

export function ComplaintFormPage() {
  return (
    <PageContainer
      title="New Complaint"
      description="Submit a new customer complaint"
    >
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input label="Title" name="title" placeholder="Brief summary" />
            <Input
              label="Category"
              name="category"
              placeholder="Billing, Product, Support..."
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="description" className="text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Describe the issue in detail"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Submit Complaint</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
