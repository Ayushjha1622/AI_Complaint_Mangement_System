import { PageContainer } from "@/components/layout/PageContainer.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card";

export function DashboardPage() {
  return (
    <PageContainer
      title="Dashboard"
      description="Overview of complaint metrics and activity"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          "Total Complaints",
          "Open Complaints",
          "Resolved",
          "Avg Resolution Time",
        ].map((label) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>—</CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
