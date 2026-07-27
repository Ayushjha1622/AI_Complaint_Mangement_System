import Input from "@/components/ui/Input/Input";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function ComplaintSearch({
    value,
    onChange,
}: Props) {
    return (
        <Input
            placeholder="Search by Complaint ID, Customer, Product..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
