export interface Complaint {
    id: string;
    customer: string;
    product: string;
    category: string;
    priority: "Low" | "Medium" | "High" | "Critical";
    status: "Open" | "In Progress" | "Resolved";
    assignedTo: string;
    createdAt: string;
}

export const complaints: Complaint[] = [
    {
        id: "CMP-1001",
        customer: "Acme Pharma",
        product: "Paracetamol",
        category: "Packaging",
        priority: "High",
        status: "Open",
        assignedTo: "John Doe",
        createdAt: "2026-07-21",
    },
    {
        id: "CMP-1002",
        customer: "HealthCare Ltd",
        product: "Ibuprofen",
        category: "Labeling",
        priority: "Medium",
        status: "Resolved",
        assignedTo: "Alice",
        createdAt: "2026-07-22",
    },
    {
        id: "CMP-1003",
        customer: "Apollo Labs",
        product: "Vitamin D",
        category: "Quality",
        priority: "Critical",
        status: "In Progress",
        assignedTo: "Robert",
        createdAt: "2026-07-23",
    },
    {
        id: "CMP-1004",
        customer: "Sun Pharma",
        product: "Insulin",
        category: "Packaging",
        priority: "Low",
        status: "Resolved",
        assignedTo: "David",
        createdAt: "2026-07-24",
    }
];
