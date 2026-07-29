import Select from "@/components/ui/Select/Select";

interface Props {
    status: string;
    priority: string;
    category: string;
    onStatusChange: (value: string) => void;
    onPriorityChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
}

export default function ComplaintFilters({
    status,
    priority,
    category,
    onStatusChange,
    onPriorityChange,
    onCategoryChange,
}: Props) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
            </Select>

            <Select
                value={priority}
                onChange={(e) => onPriorityChange(e.target.value)}
            >
                <option value="">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
            </Select>

            <Select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
                <option value="Billing">Billing</option>
                <option value="Delivery">Delivery</option>
                <option value="Other">Other</option>
            </Select>
        </div>
    );
}
