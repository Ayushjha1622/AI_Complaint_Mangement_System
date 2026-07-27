import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { ROUTES } from "@/constants/routes.ts";

export function NotFoundPage() {
  return (
    <PageContainer title="Page Not Found" description="The page you requested does not exist.">
      <Link to={ROUTES.HOME}>
        <Button>Back to Dashboard</Button>
      </Link>
    </PageContainer>
  );
}
