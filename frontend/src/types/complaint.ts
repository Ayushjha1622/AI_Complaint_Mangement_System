export type ComplaintStatus = "Open" | "In Progress" | "Investigating" | "Resolved" | "Closed";

export type ComplaintPriority = "Low" | "Medium" | "High" | "Critical";

export interface Complaint {
  id: string;
  customer: string;
  product: string;
  category: string;
  priority: ComplaintPriority;
  status: "Open" | "In Progress" | "Resolved";
  assignedTo: string;
  createdAt: string;
}

export interface ComplaintDetails {
  id: string;
  customer: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  batchNo: string;
  category: string;
  priority: ComplaintPriority;
  status: "Open" | "Assigned" | "Investigating" | "Root Cause" | "CAPA" | "Closed";
  createdAt: string;
  assignedTo: string;
  description: string;
}

export interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  user: string;
  date: string;
  completed: boolean;
}

export interface AIAnalysisData {
  summary: string;
  severity: ComplaintPriority;
  confidence: number;
  rootCause: string;
  riskScore: number;
}

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
