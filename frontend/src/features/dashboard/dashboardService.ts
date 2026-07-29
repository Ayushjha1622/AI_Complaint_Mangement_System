import api from "@/services/api";
import type { DashboardData } from "./dashboardTypes";
import type { ApiResponse } from "@/types/api";

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

export const DashboardService = {
  async getDashboard(): Promise<DashboardData> {
    const { data } =
      await api.get<ApiResponse<any>>(
        "/analytics/dashboard"
      );

    const mappedRecent = (data.data.recent_complaints || []).map((item: any) => ({
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
      ...data.data,
      recent_complaints: mappedRecent,
    };
  },
};


