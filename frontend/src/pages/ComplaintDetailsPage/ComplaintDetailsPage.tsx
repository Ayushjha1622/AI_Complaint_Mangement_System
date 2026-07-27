import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer.tsx";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card";

export function ComplaintDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContainer
      title="Complaint Details"
      description={`Viewing complaint ${id ?? ""}`}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>Complaint #{id}</CardTitle>
            <Badge variant="warning">Open</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Complaint details will load here once the API is connected.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
