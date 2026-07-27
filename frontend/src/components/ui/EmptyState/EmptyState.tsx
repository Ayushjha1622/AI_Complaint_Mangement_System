import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center py-12">
      <Inbox
        size={48}
        className="text-slate-400"
      />

      <h3 className="mt-4 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-center text-slate-500">
        {description}
      </p>
    </div>
  );
}