import ComplaintHeader from "@/components/complaint/ComplaintHeader";
import Timeline from "@/components/complaint/Timeline";
import StatusStepper from "@/components/complaint/StatusStepper";
import AIAnalysis from "@/components/complaint/AIAnalysis";
import CAPACard from "@/components/complaint/CAPACard";
import SimilarComplaints from "@/components/complaint/SimilarComplaints";
import AttachmentViewer from "@/components/complaint/AttachmentViewer";
import Comments from "@/components/complaint/Comments";
import ActivityLog from "@/components/complaint/ActivityLog";

import Card from "@/components/ui/Card/Card";
import { complaintDetails } from "@/data/complaintDetails";

export default function ComplaintDetailsPage() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <ComplaintHeader complaint={complaintDetails} />

      {/* Customer & Product Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-5 text-xl font-semibold text-slate-900">
            Customer Information
          </h2>

          <div className="space-y-3 text-slate-700">
            <p>
              <strong>Name:</strong> {complaintDetails.customer}
            </p>

            <p>
              <strong>Company:</strong> {complaintDetails.company}
            </p>

            <p>
              <strong>Email:</strong> {complaintDetails.email}
            </p>

            <p>
              <strong>Phone:</strong> {complaintDetails.phone}
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="mb-5 text-xl font-semibold text-slate-900">
            Product Information
          </h2>

          <div className="space-y-3 text-slate-700">
            <p>
              <strong>Product:</strong> {complaintDetails.product}
            </p>

            <p>
              <strong>Batch:</strong> {complaintDetails.batchNo}
            </p>

            <p>
              <strong>Category:</strong> {complaintDetails.category}
            </p>

            <p>
              <strong>Assigned To:</strong> {complaintDetails.assignedTo}
            </p>
          </div>
        </Card>
      </div>

      {/* Complaint Description */}
      <Card>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Complaint Description
        </h2>

        <p className="leading-7 text-slate-600">
          {complaintDetails.description}
        </p>
      </Card>

      {/* Progress & Timeline */}
      <div className="grid gap-6 lg:grid-cols-2">
        <StatusStepper currentStatus={complaintDetails.status} />
        <Timeline />
      </div>

      {/* AI Investigation & CAPA Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AIAnalysis />
        <CAPACard />
      </div>

      {/* Similar Complaints */}
      <SimilarComplaints />

      {/* Attachments & Activity Log */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AttachmentViewer />
        <ActivityLog />
      </div>

      {/* Investigation Comments */}
      <Comments />
    </div>
  );
}
