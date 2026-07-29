import api from "@/services/api";
import type { ApiResponse } from "@/types/api";
import type { Complaint } from "@/types/complaint";
import type {
  ComplaintListResponse,
  ComplaintQuery,
} from "./complaintTypes";

const mapBackendStatusToFrontend = (status: string): "Open" | "In Progress" | "Resolved" => {
  const s = status.toUpperCase();
  if (s === "OPEN") return "Open";
  if (s === "IN_PROGRESS" || s === "UNDER_REVIEW") return "In Progress";
  if (s === "RESOLVED" || s === "CLOSED") return "Resolved";
  return "Open";
};

const mapBackendPriorityToFrontend = (priority: string): "Low" | "Medium" | "High" | "Critical" => {
  const p = priority.toUpperCase();
  if (p === "LOW") return "Low";
  if (p === "MEDIUM") return "Medium";
  if (p === "HIGH") return "High";
  if (p === "CRITICAL") return "Critical";
  return "Medium";
};

class ComplaintService {
  async getAll(query: ComplaintQuery): Promise<ComplaintListResponse> {
    const apiParams: Record<string, any> = {};

    if (query.page) apiParams.page = query.page;
    if (query.page_size) apiParams.page_size = query.page_size;
    if (query.search) apiParams.search = query.search;
    if (query.sort_order) apiParams.sort_order = query.sort_order;

    // Map sort_by parameter
    if (query.sort_by) {
      if (query.sort_by === "createdAt") {
        apiParams.sort_by = "created_at";
      } else if (query.sort_by === "assignedTo") {
        apiParams.sort_by = "assigned_to";
      } else {
        apiParams.sort_by = query.sort_by;
      }
    }

    // Map status filter
    if (query.status) {
      apiParams.status = query.status.toUpperCase().replace(" ", "_");
    }
    
    // Map priority filter
    if (query.priority) {
      apiParams.priority = query.priority.toUpperCase();
    }
    
    // Map category filter
    if (query.category) {
      apiParams.category = query.category.toUpperCase();
    }

    const { data } =
      await api.get<ApiResponse<{ items: any[]; pagination: any }>>(
        "/complaints",
        {
          params: apiParams,
        }
      );

    const items: Complaint[] = data.data.items.map((item: any) => ({
      id: item.complaint_number || item.id,
      customer: item.customer_name,
      product: item.title,
      category: item.category ? (item.category.charAt(0) + item.category.slice(1).toLowerCase()) : "Other",
      priority: mapBackendPriorityToFrontend(item.priority),
      status: mapBackendStatusToFrontend(item.status),
      assignedTo: item.assigned_to || "Unassigned",
      createdAt: item.created_at ? item.created_at.split("T")[0] : "",
    }));

    return {
      items,
      pagination: data.data.pagination,
    };
  }
}

export default new ComplaintService();
