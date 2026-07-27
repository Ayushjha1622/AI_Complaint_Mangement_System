import { Link } from "react-router-dom";

import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import { ROUTES } from "@/constants/routes";

export default function ComplaintListPage() {
  return (
    <PageContainer
      title="Complaints"
      description="Browse and manage all submitted complaints"
    >
      <div className="mb-6 flex justify-end">
        <Link to={ROUTES.NEW_COMPLAINT}>
          <Button>New Complaint</Button>
        </Link>
      </div>

      <Card>
        <EmptyState
          title="No complaints found"
          description="There are no complaints yet. Click 'New Complaint' to create your first complaint."
        />
      </Card>
    </PageContainer>
  );
}