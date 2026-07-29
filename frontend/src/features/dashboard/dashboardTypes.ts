export interface DashboardStats {
  total_complaints: number;
  open: number;
  in_progress: number;
  under_review: number;
  resolved: number;
  closed: number;
  high_priority: number;
  critical_priority: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
}

export interface PriorityDistribution {
  priority: string;
  count: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
}

export interface MonthlyTrend {
  month: string;
  count: number;
}

import type { Complaint } from "@/types/complaint";

export interface DashboardData {
  summary: DashboardStats;
  status_distribution: StatusDistribution[];
  priority_distribution: PriorityDistribution[];
  category_distribution: CategoryDistribution[];
  monthly_trend: MonthlyTrend[];
  recent_complaints: Complaint[];
}


