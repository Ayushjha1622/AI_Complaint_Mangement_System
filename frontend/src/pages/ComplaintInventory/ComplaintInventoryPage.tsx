import { useMemo, useState } from "react";

import ComplaintSearch from "@/components/complaint/ComplaintSearch";
import ComplaintFilters from "@/components/complaint/ComplaintFilters";
import ComplaintStats from "@/components/complaint/ComplaintStats";
import ComplaintTable from "@/components/complaint/ComplaintTable";
import Pagination from "@/components/complaint/Pagination";
import BulkActions from "@/components/complaint/BulkActions";

import { complaints } from "@/data/complaints";
import type { Complaint } from "@/data/complaints";

const PAGE_SIZE = 10;

export default function ComplaintInventoryPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [page, setPage] = useState(1);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint: Complaint) => {
      const matchesSearch =
        complaint.id.toLowerCase().includes(search.toLowerCase()) ||
        complaint.customer.toLowerCase().includes(search.toLowerCase()) ||
        complaint.product.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "" || complaint.status === status;

      const matchesPriority =
        priority === "" || complaint.priority === priority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [search, status, priority]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredComplaints.length / PAGE_SIZE)
  );

  const paginatedComplaints = filteredComplaints.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

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
          title="Total"
          value={complaints.length}
        />

        <ComplaintStats
          title="Filtered"
          value={filteredComplaints.length}
        />

        <ComplaintStats
          title="Open"
          value={
            complaints.filter(
              (c) => c.status === "Open"
            ).length
          }
        />

        <ComplaintStats
          title="Resolved"
          value={
            complaints.filter(
              (c) => c.status === "Resolved"
            ).length
          }
        />
      </div>

      {/* Search */}
      <ComplaintSearch
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {/* Filters */}
      <ComplaintFilters
        status={status}
        priority={priority}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onPriorityChange={(value) => {
          setPriority(value);
          setPage(1);
        }}
      />

      {/* Bulk Actions */}
      <BulkActions />

      {/* Table */}
      <ComplaintTable
        complaints={paginatedComplaints}
        onView={(complaint) => {
          console.log(complaint);
        }}
      />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() =>
          setPage((prev) => Math.max(1, prev - 1))
        }
        onNext={() =>
          setPage((prev) =>
            Math.min(totalPages, prev + 1)
          )
        }
      />
    </div>
  );
}
