import type { Complaint } from "@/types/complaint.ts";

export type ComplaintsState = {
  items: Complaint[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
};
