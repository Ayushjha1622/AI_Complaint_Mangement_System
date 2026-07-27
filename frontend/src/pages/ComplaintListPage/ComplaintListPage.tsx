import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer.tsx";
import { Button } from "@/components/ui/Button.tsx";
import {
  Table,
  TableBody,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table.tsx";
import { ROUTES } from "@/constants/routes.ts";

export function ComplaintListPage() {
  return (
    <PageContainer
      title="Complaints"
      description="Browse and manage all submitted complaints"
    >
      <div className="mb-4 flex justify-end">
        <Link to={ROUTES.COMPLAINT_NEW}>
          <Button>New Complaint</Button>
        </Link>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Priority</TableHeader>
              <TableHeader>Created</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableEmpty colSpan={4} message="No complaints yet." />
          </TableBody>
        </Table>
      </div>
    </PageContainer>
  );
}
