export interface Metric {
  id: number;
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: string;
  color: string;
}

export interface ComplaintTrend {
  month: string;
  complaints: number;
  resolved: number;
}

export interface ComplaintStatus {
  name: string;
  value: number;
}

export interface RecentComplaint {
  id: string;
  customer: string;
  product: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
}

export interface AIInsight {
  id: number;
  insight: string;
  action: string;
  severity: "info" | "warning" | "critical";
}

export interface CriticalAlert {
  id: number;
  title: string;
  description: string;
  type: "high-risk" | "capa-pending" | "escalation";
}

export const metrics: Metric[] = [
  {
    id: 1,
    title: "Total Complaints",
    value: "1,248",
    change: 12,
    trend: "up",
    icon: "📋",
    color: "indigo",
  },
  {
    id: 2,
    title: "Open Complaints",
    value: "82",
    change: 5,
    trend: "down",
    icon: "🔓",
    color: "amber",
  },
  {
    id: 3,
    title: "Resolved Today",
    value: "37",
    change: 18,
    trend: "up",
    icon: "✅",
    color: "emerald",
  },
  {
    id: 4,
    title: "Avg Resolution",
    value: "2.6 Days",
    change: 9,
    trend: "down",
    icon: "⏱️",
    color: "violet",
  },
];

export const complaintTrend: ComplaintTrend[] = [
  { month: "Jan", complaints: 40, resolved: 34 },
  { month: "Feb", complaints: 55, resolved: 46 },
  { month: "Mar", complaints: 61, resolved: 58 },
  { month: "Apr", complaints: 70, resolved: 66 },
  { month: "May", complaints: 82, resolved: 74 },
  { month: "Jun", complaints: 91, resolved: 86 },
];

export const complaintStatus: ComplaintStatus[] = [
  { name: "Open", value: 32 },
  { name: "Resolved", value: 54 },
  { name: "Pending", value: 10 },
  { name: "Escalated", value: 4 },
];

export const recentComplaints: RecentComplaint[] = [
  {
    id: "CMP-1001",
    customer: "Acme Pharma",
    product: "Paracetamol",
    priority: "High",
    status: "Open",
    createdAt: "2026-07-25",
  },
  {
    id: "CMP-1002",
    customer: "HealthCare Ltd",
    product: "Ibuprofen",
    priority: "Medium",
    status: "Resolved",
    createdAt: "2026-07-24",
  },
  {
    id: "CMP-1003",
    customer: "Apollo Labs",
    product: "Vitamin D",
    priority: "Critical",
    status: "In Progress",
    createdAt: "2026-07-23",
  },
  {
    id: "CMP-1004",
    customer: "MedSupply Co",
    product: "Insulin",
    priority: "High",
    status: "Open",
    createdAt: "2026-07-22",
  },
  {
    id: "CMP-1005",
    customer: "PharmaCore",
    product: "Amoxicillin",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-07-21",
  },
];

export const aiInsights: AIInsight[] = [
  {
    id: 1,
    insight: "Quality complaints increased by 18% during the last 7 days.",
    action: "Investigate Batch #B128.",
    severity: "warning",
  },
  {
    id: 2,
    insight: "3 complaints share root cause: temperature excursion in transit.",
    action: "Review cold-chain SOP for Zone 4.",
    severity: "critical",
  },
  {
    id: 3,
    insight: "Resolution rate improved by 22% vs last month.",
    action: "No action required — trend is positive.",
    severity: "info",
  },
];

export const criticalAlerts: CriticalAlert[] = [
  {
    id: 1,
    title: "High Risk Complaint",
    description: "CMP-1003 flagged as critical by AI — patient safety risk.",
    type: "high-risk",
  },
  {
    id: 2,
    title: "CAPA Pending",
    description: "2 CAPA actions overdue by more than 7 days.",
    type: "capa-pending",
  },
  {
    id: 3,
    title: "Escalation Required",
    description: "CMP-1001 has been open for 14 days without resolution.",
    type: "escalation",
  },
];
