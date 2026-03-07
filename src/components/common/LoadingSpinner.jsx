import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSpinner() {
  return (
    <div className="w-full space-y-6 animate-fade-in" role="status" aria-label="Loading weather data">
      <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-28" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-16 w-32" />
            </div>
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:w-64">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-40 min-w-[140px] flex-1 rounded-2xl" />
        ))}
      </div>
      <span className="sr-only">Loading weather data...</span>
    </div>
  );
}
