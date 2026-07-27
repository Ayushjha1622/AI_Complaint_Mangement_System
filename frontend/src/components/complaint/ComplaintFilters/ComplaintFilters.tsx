import Select from "@/components/ui/Select/Select";

interface Props {
    status: string;
    priority: string;
    onStatusChange: (value: string) => void;
    onPriorityChange: (value: string) => void;
}

export default function ComplaintFilters({
    status,
    priority,
    onStatusChange,
    onPriorityChange,
}: Props) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
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
        </div>
    );
}
