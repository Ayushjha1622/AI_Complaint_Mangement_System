import api from "@/services/api";
import type { DashboardStats } from "@/types/dashboard";

export const DashboardService = {
  async getStats(): Promise<DashboardStats> {
    const { data } = await api.get<{ success: boolean; message: string; data: DashboardStats }>("/analytics/dashboard");
    return data.data;
  },
};
export default DashboardService;
