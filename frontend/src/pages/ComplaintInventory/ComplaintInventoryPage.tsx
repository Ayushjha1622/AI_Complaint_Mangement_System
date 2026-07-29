import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchComplaints } from "@/features/complaints/complaintSlice";

import ComplaintSearch from "@/components/complaint/ComplaintSearch";
import ComplaintFilters from "@/components/complaint/ComplaintFilters";
import ComplaintStats from "@/components/complaint/ComplaintStats";
import ComplaintTable from "@/components/complaint/ComplaintTable";
import Pagination from "@/components/complaint/Pagination";
import BulkActions from "@/components/complaint/BulkActions";

export default function ComplaintInventoryPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, loading } = useAppSelector(
    (state) => state.complaints
  );

  const [query, setQuery] = useState({
    page: 1,
    page_size: 10,
    search: "",
    status: "",
    priority: "",
    category: "",
    sort_by: "created_at",
    sort_order: "desc" as "asc" | "desc",
  });

  useEffect(() => {
    dispatch(fetchComplaints(query));
  }, [dispatch, query]);

  const handleSort = (column: string) => {
    setQuery((prev) => ({
      ...prev,
      sort_by: column,
      sort_order:
        prev.sort_by === column && prev.sort_order === "asc" ? "desc" : "asc",
    }));
  };

  const openComplaint = (id: string) => {
    navigate(`/complaints/${id}`);
  };

  const complaintsList = data?.items ?? [];
  const paginationInfo = data?.pagination ?? {
    page: 1,
    page_size: 10,
    total: 0,
    total_pages: 1,
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Complaint Inventory
          </h1>
          <p className="mt-1 text-slate-500">
            Manage customer complaints efficiently.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <ComplaintStats
          title="Total Complaints"
          value={loading ? "..." : paginationInfo.total}
        />
        <ComplaintStats
          title="Open"
          value={loading ? "..." : complaintsList.filter((c) => c.status === "Open").length}
        />
        <ComplaintStats
          title="In Progress"
          value={loading ? "..." : complaintsList.filter((c) => c.status === "In Progress").length}
        />
        <ComplaintStats
          title="Resolved"
          value={loading ? "..." : complaintsList.filter((c) => c.status === "Resolved").length}
        />
      </div>

      {/* Search */}
      <ComplaintSearch
        value={query.search}
        onChange={(value) => {
          setQuery((prev) => ({
            ...prev,
            page: 1,
            search: value,
          }));
        }}
      />

      {/* Filters */}
      <ComplaintFilters
        status={query.status}
        priority={query.priority}
        category={query.category}
        onStatusChange={(value) => {
          setQuery((prev) => ({
            ...prev,
            page: 1,
            status: value,
          }));
        }}
        onPriorityChange={(value) => {
          setQuery((prev) => ({
            ...prev,
            page: 1,
            priority: value,
          }));
        }}
        onCategoryChange={(value) => {
          setQuery((prev) => ({
            ...prev,
            page: 1,
            category: value,
          }));
        }}
      />

      {/* Bulk Actions */}
      <BulkActions />

      {/* Table */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600/30 border-t-indigo-600" />
            <p className="text-sm font-medium text-slate-500">Loading complaints...</p>
          </div>
        </div>
      ) : (
        <ComplaintTable
          complaints={complaintsList}
          sortBy={query.sort_by}
          sortOrder={query.sort_order}
          onSort={handleSort}
          onRowClick={(complaint) => openComplaint(complaint.id)}
          onView={(complaint) => openComplaint(complaint.id)}
        />
      )}

      {/* Pagination */}
      <Pagination
        page={query.page}
        totalPages={paginationInfo.total_pages}
        onPrevious={() =>
          setQuery((prev) => ({
            ...prev,
            page: Math.max(1, prev.page - 1),
          }))
        }
        onNext={() =>
          setQuery((prev) => ({
            ...prev,
            page: Math.min(paginationInfo.total_pages, prev.page + 1),
          }))
        }
      />
    </div>
  );
}
