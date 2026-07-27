import { useParams } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import Badge  from "@/components/ui/Badge/Badge";
import Card from "@/components/ui/Card/Card";

export default function ComplaintDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContainer
      title="Complaint Details"
      description={`Viewing complaint ${id ?? ""}`}
    >
      <Card>
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-xl font-semibold">
      Complaint #{id}
    </h2>

    <Badge color="yellow">
      Open
    </Badge>
  </div>

  <p className="text-slate-600">
    Complaint details will load here once the API is connected.
  </p>
</Card>
    </PageContainer>
  );
}
