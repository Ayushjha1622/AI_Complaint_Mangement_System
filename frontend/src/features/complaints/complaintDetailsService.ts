import api from "@/services/api";

export interface BackendComplaint {
  id: string;
  complaint_number: string;
  title: string;
  description: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  category: string;
  priority: string;
  status: string;
  assigned_to: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface BackendTimelineItem {
  id: string;
  action: string;
  field_name: string | null;
  old_value: string | null;
  new_value: string | null;
  performed_by: string;
  created_at: string;
}

export const ComplaintDetailsService = {
  async getComplaint(id: string): Promise<BackendComplaint> {
    const { data } = await api.get(`/complaints/${id}`);
    return data.data;
  },

  async getTimeline(id: string): Promise<BackendTimelineItem[]> {
    const { data } = await api.get(`/complaints/${id}/timeline`);
    return data.data;
  },

  async assignComplaint(id: string, assignedTo: string): Promise<BackendComplaint> {
    const { data } = await api.patch(`/complaints/${id}/assign`, { assigned_to: assignedTo });
    return data.data;
  },

  async updateStatus(id: string, status: string): Promise<BackendComplaint> {
    const { data } = await api.patch(`/complaints/${id}/status`, { status });
    return data.data;
  },

  async getInvestigators(): Promise<{ id: string; full_name: string; email: string }[]> {
    const { data } = await api.get("/users", { params: { role: "INVESTIGATOR" } });
    return data.data ?? [];
  },
};
