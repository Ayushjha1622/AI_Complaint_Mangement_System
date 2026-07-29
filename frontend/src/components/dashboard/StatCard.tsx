import Card from "@/components/ui/Card/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  color?: "blue" | "amber" | "green" | "red";
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  color = "blue",
  loading = false,
}: StatCardProps) {
  const colorMap = {
    blue: { bg: "bg-blue-50 dark:bg-blue-950/40 border border-blue-100/50 dark:border-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
    amber: { bg: "bg-amber-50 dark:bg-amber-950/40 border border-amber-100/50 dark:border-amber-900/30", text: "text-amber-600 dark:text-amber-400" },
    green: { bg: "bg-green-50 dark:bg-green-950/40 border border-green-100/50 dark:border-green-900/30", text: "text-green-600 dark:text-green-400" },
    red: { bg: "bg-red-50 dark:bg-red-950/40 border border-red-100/50 dark:border-red-900/30", text: "text-red-600 dark:text-red-400" },
  };

  const theme = colorMap[color];

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-16 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{value}</h3>
          {description && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        {icon && (
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bg} ${theme.text} transition-colors duration-300`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

