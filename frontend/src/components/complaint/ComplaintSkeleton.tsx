import Card from "@/components/ui/Card/Card";

export default function ComplaintSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
      </div>

      {/* Info Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details Card (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-6">
            <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-2">
              <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </Card>
        </div>

        {/* Sidebar Cards (Right 1 col) */}
        <div className="space-y-6">
          {/* Assignment Skeleton */}
          <Card className="space-y-4">
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </Card>

          {/* Status Skeleton */}
          <Card className="space-y-4">
            <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}
