import Card from "@/components/ui/Card/Card";

interface Props {
    title: string;
    value: number | string;
}

export default function ComplaintStats({
    title,
    value,
}: Props) {
    return (
        <Card>
            <p className="text-sm text-gray-500">
                {title}
            </p>
            <h2 className="mt-2 text-3xl font-bold">
                {value}
            </h2>
        </Card>
    );
}
