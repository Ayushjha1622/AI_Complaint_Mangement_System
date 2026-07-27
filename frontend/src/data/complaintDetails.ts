export interface ComplaintDetails {
  id: string;
  customer: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  batchNo: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "Investigating" | "Resolved";
  createdAt: string;
  assignedTo: string;
  description: string;
}

export const complaintDetails: ComplaintDetails = {
  id: "CMP-1001",
  customer: "Acme Pharma",
  email: "support@acmepharma.com",
  phone: "+1 555 123 4567",
  company: "Acme Pharma Ltd",
  product: "Paracetamol 500mg",
  batchNo: "BATCH-128",
  category: "Packaging",
  priority: "High",
  status: "Investigating",
  createdAt: "2026-07-21",
  assignedTo: "John Doe",
  description:
    "Customer reported damaged packaging and broken safety seal on multiple medicine boxes received during shipment.",
};

export interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  user: string;
  date: string;
  completed: boolean;
}

export const timeline: TimelineEvent[] = [
  {
    id: 1,
    title: "Complaint Created",
    description: "Customer submitted complaint.",
    user: "Customer",
    date: "21 Jul 2026 09:30",
    completed: true,
  },
  {
    id: 2,
    title: "Assigned to QA",
    description: "Complaint assigned to John Doe.",
    user: "System",
    date: "21 Jul 2026 10:00",
    completed: true,
  },
  {
    id: 3,
    title: "Investigation Started",
    description: "Packaging inspection initiated.",
    user: "John Doe",
    date: "21 Jul 2026 11:20",
    completed: true,
  },
  {
    id: 4,
    title: "Root Cause Analysis",
    description: "Awaiting investigation report.",
    user: "QA Team",
    date: "",
    completed: false,
  },
  {
    id: 5,
    title: "CAPA Approval",
    description: "Pending",
    user: "Quality Manager",
    date: "",
    completed: false,
  },
];

export interface AIAnalysisData {
  summary: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
  rootCause: string;
  riskScore: number;
}

export const aiAnalysis: AIAnalysisData = {
  summary:
    "Multiple medicine boxes arrived with damaged packaging and broken safety seals. Similar complaints indicate a packaging line issue.",
  severity: "High",
  confidence: 94,
  rootCause:
    "Packaging machine #3 produced inconsistent seal pressure resulting in damaged blister packs.",
  riskScore: 82,
};

export const capaRecommendations = [
  "Stop Packaging Line #3 immediately.",
  "Inspect sealing pressure calibration.",
  "Increase QA sampling frequency.",
  "Review operator training records.",
  "Notify production supervisor.",
];

export const similarComplaints = [
  {
    id: "CMP-0981",
    product: "Paracetamol",
    similarity: 96,
  },
  {
    id: "CMP-0942",
    product: "Vitamin C",
    similarity: 91,
  },
  {
    id: "CMP-0870",
    product: "Ibuprofen",
    similarity: 89,
  },
];

export interface Attachment {
  id: number;
  name: string;
  type: "image" | "pdf";
  size: string;
}

export interface Comment {
  id: number;
  author: string;
  message: string;
  createdAt: string;
}

export interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
}

export const attachments: Attachment[] = [
  {
    id: 1,
    name: "damaged-package.jpg",
    type: "image",
    size: "1.8 MB",
  },
  {
    id: 2,
    name: "inspection-report.pdf",
    type: "pdf",
    size: "420 KB",
  },
];

export const comments: Comment[] = [
  {
    id: 1,
    author: "John Doe",
    message:
      "Packaging inspection started. Seal integrity appears inconsistent.",
    createdAt: "21 Jul 2026 11:45",
  },
  {
    id: 2,
    author: "Alice Smith",
    message:
      "Requested additional samples from production.",
    createdAt: "21 Jul 2026 14:10",
  },
];

export const activityLog: Activity[] = [
  {
    id: 1,
    action: "Complaint Created",
    user: "Customer Portal",
    time: "09:20",
  },
  {
    id: 2,
    action: "Assigned to John Doe",
    user: "System",
    time: "10:00",
  },
  {
    id: 3,
    action: "Investigation Started",
    user: "John Doe",
    time: "11:20",
  },
  {
    id: 4,
    action: "AI Analysis Generated",
    user: "AI Agent",
    time: "11:25",
  },
];
