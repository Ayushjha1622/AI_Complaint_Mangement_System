import api from "./api";
import type { Complaint } from "@/types/complaint";

export const ComplaintService = {
  getAll: () => api.get<Complaint[]>("/complaints"),

  getById: (id: string) => api.get<Complaint>(`/complaints/${id}`),

  create: (payload: Partial<Complaint>) =>
    api.post<Complaint>("/complaints", payload),

  update: (id: string, payload: Partial<Complaint>) =>
    api.put<Complaint>(`/complaints/${id}`, payload),

  delete: (id: string) => api.delete<{ success: boolean }>(`/complaints/${id}`),
};
