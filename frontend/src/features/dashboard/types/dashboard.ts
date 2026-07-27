import type { DashboardStats } from "@/types/dashboard.ts";

export type DashboardState = {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
};
