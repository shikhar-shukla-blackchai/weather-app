import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSpinner() {
  return (
    <div className="w-full space-y-6 animate-fade-in" role="status" aria-label="Loading weather data">
      <div className="rounded-3xl bg-white/50 dark:bg-gray-950/50 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-xl shadow-black/5 dark:shadow-black/20 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-40 bg-white/30 dark:bg-white/5" />
            <Skeleton className="h-3 w-28 bg-white/30 dark:bg-white/5" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full bg-white/30 dark:bg-white/5" />
              <Skeleton className="h-16 w-32 bg-white/30 dark:bg-white/5" />
            </div>
            <Skeleton className="h-4 w-36 bg-white/30 dark:bg-white/5" />
          </div>
          <div className="grid grid-cols-2 gap-2.5 md:w-56">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl bg-white/30 dark:bg-white/5" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-36 min-w-[120px] flex-1 rounded-2xl bg-white/30 dark:bg-white/5" />
        ))}
      </div>
      <span className="sr-only">Loading weather data...</span>
    </div>
  );
}
