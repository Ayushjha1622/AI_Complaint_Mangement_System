import type { Complaint } from "@/types/complaint";

export interface ComplaintQuery {
  page?: number;
  page_size?: number;
  search?: string;
  status?: string;
  priority?: string;
  category?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface Pagination {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface ComplaintListResponse {
  items: Complaint[];
  pagination: Pagination;
}
