import { Link } from "react-router-dom";

import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import { ROUTES } from "@/constants/routes";

export default function NotFoundPage() {
  return (
    <PageContainer
      title="404 - Page Not Found"
      description="The page you requested does not exist."
    >
      <Card className="flex flex-col items-center gap-6 py-10 text-center">
        <h2 className="text-6xl font-bold text-indigo-600">404</h2>

        <p className="text-slate-600">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <Link to={ROUTES.DASHBOARD}>
          <Button>Back to Dashboard</Button>
        </Link>
      </Card>
    </PageContainer>
  );
}