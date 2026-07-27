export type ComplaintStatus = "open" | "in_progress" | "resolved" | "closed";

export type ComplaintPriority = "low" | "medium" | "high" | "critical";

export type Complaint = {
  id: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type ComplaintFormData = Pick<
  Complaint,
  "title" | "description" | "priority" | "category"
>;
