import Card from "@/components/ui/Card/Card";
import type { BackendComplaint as Complaint } from "@/features/complaints/complaintDetailsService";

interface ComplaintInfoCardProps {
  complaint: Complaint;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const CATEGORY_LABELS: Record<string, string> = {
  BILLING: "Billing",
  PRODUCT_QUALITY: "Product Quality",
  SERVICE_ISSUE: "Service Issue",
  OTHER: "Other",
};

export default function ComplaintInfoCard({ complaint }: ComplaintInfoCardProps) {
  const categoryLabel = CATEGORY_LABELS[complaint.category] || complaint.category;

  return (
    <Card className="divide-y divide-slate-100 dark:divide-slate-800">
      {/* Grid of properties */}
      <div className="pb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Complaint Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Customer Name</span>
            <p className="mt-1 font-medium text-slate-850 dark:text-slate-200">{complaint.customer_name}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Customer Email</span>
            <p className="mt-1 font-medium text-slate-850 dark:text-slate-200">{complaint.customer_email}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Customer Phone</span>
            <p className="mt-1 font-medium text-slate-850 dark:text-slate-200">{complaint.customer_phone || "—"}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Category</span>
            <p className="mt-1 font-medium text-slate-850 dark:text-slate-200">{categoryLabel}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Created By</span>
            <p className="mt-1 font-medium text-slate-850 dark:text-slate-200 font-mono text-xs">{complaint.created_by}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Assigned To</span>
            <p className="mt-1 font-medium text-slate-850 dark:text-slate-200">{complaint.assigned_to || "Unassigned"}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Created At</span>
            <p className="mt-1 font-medium text-slate-850 dark:text-slate-200">{formatDate(complaint.created_at)}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Last Updated</span>
            <p className="mt-1 font-medium text-slate-850 dark:text-slate-200">{formatDate(complaint.updated_at)}</p>
          </div>
        </div>
      </div>

      {/* Description area */}
      <div className="pt-6">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Description</h4>
        <p className="text-slate-700 dark:text-slate-350 text-sm leading-relaxed whitespace-pre-wrap">
          {complaint.description}
        </p>
      </div>
    </Card>
  );
}
