import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchComplaintDetail,
  fetchTimeline,
  fetchInvestigators,
  assignComplaint,
  updateComplaintStatus,
  clearComplaintDetails,
} from "@/features/complaints/complaintDetailsSlice";
import ComplaintTimeline from "@/components/complaint/ComplaintTimeline/ComplaintTimeline";
import styles from "./ComplaintDetailsPage.module.css";

// ─── Status helpers ───────────────────────────────────────────────────────────
const ALL_STATUSES = ["OPEN", "IN_PROGRESS", "UNDER_REVIEW", "RESOLVED", "CLOSED"] as const;

const STATUS_LABELS: Record<string, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  UNDER_REVIEW: "Under Review",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const STATUS_COLORS: Record<string, string> = {
  OPEN: "#1d4ed8",
  IN_PROGRESS: "#b45309",
  UNDER_REVIEW: "#6d28d9",
  RESOLVED: "#065f46",
  CLOSED: "#475569",
};

const STATUS_BG: Record<string, string> = {
  OPEN: "#dbeafe",
  IN_PROGRESS: "#fef3c7",
  UNDER_REVIEW: "#ede9fe",
  RESOLVED: "#d1fae5",
  CLOSED: "#f1f5f9",
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "#16a34a",
  MEDIUM: "#d97706",
  HIGH: "#dc2626",
  CRITICAL: "#7c3aed",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ComplaintDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { complaint, timeline, investigators, loading, timelineLoading, actionLoading, error } =
    useAppSelector((s) => s.complaintDetails);
  const user = useAppSelector((s) => s.auth.user);

  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Role gates
  const canAssign =
    user?.role === "ADMIN" || user?.role === "QA_MANAGER";
  const canUpdateStatus =
    user?.role === "ADMIN" ||
    user?.role === "QA_MANAGER" ||
    user?.role === "INVESTIGATOR";

  // Load on mount
  useEffect(() => {
    if (!id) return;
    dispatch(fetchComplaintDetail(id));
    dispatch(fetchTimeline(id));
    if (canAssign) dispatch(fetchInvestigators());

    return () => {
      dispatch(clearComplaintDetails());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Sync status picker when complaint loads
  useEffect(() => {
    if (complaint) setSelectedStatus(complaint.status);
  }, [complaint]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  async function handleAssign() {
    if (!id || !selectedAssignee) return;
    const result = await dispatch(assignComplaint({ id, assigned_to: selectedAssignee }));
    if (assignComplaint.fulfilled.match(result)) {
      dispatch(fetchTimeline(id));
      setActionMsg({ type: "success", text: "Investigator assigned successfully." });
    } else {
      setActionMsg({ type: "error", text: result.payload as string });
    }
    setTimeout(() => setActionMsg(null), 3500);
  }

  async function handleStatusUpdate() {
    if (!id || !selectedStatus) return;
    const result = await dispatch(updateComplaintStatus({ id, status: selectedStatus }));
    if (updateComplaintStatus.fulfilled.match(result)) {
      dispatch(fetchTimeline(id));
      setActionMsg({ type: "success", text: "Status updated successfully." });
    } else {
      setActionMsg({ type: "error", text: result.payload as string });
    }
    setTimeout(() => setActionMsg(null), 3500);
  }

  // ── Loading / error state ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
        <p>Loading complaint…</p>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className={styles.centered}>
        <p className={styles.errorMsg}>{error || "Complaint not found."}</p>
        <button className={styles.backBtn} onClick={() => navigate("/complaints")}>
          ← Back to Complaints
        </button>
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  const priorityColor = PRIORITY_COLORS[complaint.priority] ?? "#64748b";
  const statusBg = STATUS_BG[complaint.status] ?? "#f1f5f9";
  const statusColor = STATUS_COLORS[complaint.status] ?? "#475569";

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Dashboard</Link>
        <span>/</span>
        <Link to="/complaints">Complaints</Link>
        <span>/</span>
        <span className={styles.breadcrumbCurrent}>{complaint.complaint_number}</span>
      </nav>

      {/* Toast */}
      {actionMsg && (
        <div className={`${styles.toast} ${styles[`toast_${actionMsg.type}`]}`}>
          {actionMsg.text}
        </div>
      )}

      {/* ── Header ── */}
      <div className={styles.header}>
        <div>
          <div className={styles.complaintNumber}>{complaint.complaint_number}</div>
          <h1 className={styles.title}>{complaint.title}</h1>
        </div>
        <div className={styles.headerBadges}>
          <span
            className={styles.statusBadge}
            style={{ background: statusBg, color: statusColor }}
          >
            {STATUS_LABELS[complaint.status] ?? complaint.status}
          </span>
          <span className={styles.priorityBadge} style={{ color: priorityColor, borderColor: priorityColor }}>
            {complaint.priority}
          </span>
        </div>
      </div>

      {/* ── Info Grid ── */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Complaint Information</h2>
          <dl className={styles.dl}>
            <dt>Category</dt>
            <dd>{complaint.category.charAt(0) + complaint.category.slice(1).toLowerCase()}</dd>
            <dt>Priority</dt>
            <dd style={{ color: priorityColor, fontWeight: 700 }}>{complaint.priority}</dd>
            <dt>Status</dt>
            <dd>
              <span
                style={{ background: statusBg, color: statusColor, padding: "0.15rem 0.55rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 700 }}
              >
                {STATUS_LABELS[complaint.status] ?? complaint.status}
              </span>
            </dd>
            <dt>Created At</dt>
            <dd>{formatDate(complaint.created_at)}</dd>
          </dl>
        </div>

        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Customer Information</h2>
          <dl className={styles.dl}>
            <dt>Name</dt>
            <dd>{complaint.customer_name}</dd>
            <dt>Email</dt>
            <dd>{complaint.customer_email}</dd>
            {complaint.customer_phone && (
              <>
                <dt>Phone</dt>
                <dd>{complaint.customer_phone}</dd>
              </>
            )}
            <dt>Assigned To</dt>
            <dd>{complaint.assigned_to ?? <span className={styles.muted}>Unassigned</span>}</dd>
          </dl>
        </div>
      </div>

      {/* ── Description ── */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <p className={styles.description}>{complaint.description}</p>
      </div>

      {/* ── Main content row ── */}
      <div className={styles.mainRow}>
        {/* Timeline */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Timeline</h2>
          <ComplaintTimeline items={timeline} loading={timelineLoading} />
        </div>

        {/* Actions column */}
        <div className={styles.actionsCol}>
          {/* Assignment */}
          {canAssign && (
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Assignment</h2>
              <p className={styles.hint}>Assign an investigator to this complaint.</p>
              <select
                className={styles.select}
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
              >
                <option value="">— Select Investigator —</option>
                {investigators.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.full_name}
                  </option>
                ))}
              </select>
              <button
                className={styles.btnPrimary}
                onClick={handleAssign}
                disabled={!selectedAssignee || actionLoading}
              >
                {actionLoading ? "Assigning…" : "Assign"}
              </button>
            </div>
          )}

          {/* Status Update */}
          {canUpdateStatus && (
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Update Status</h2>
              <p className={styles.hint}>Change the current status of this complaint.</p>
              <select
                className={styles.select}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              <button
                className={styles.btnPrimary}
                onClick={handleStatusUpdate}
                disabled={!selectedStatus || actionLoading}
              >
                {actionLoading ? "Updating…" : "Update Status"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
