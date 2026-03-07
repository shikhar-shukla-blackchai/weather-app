import { CloudSun, Search } from "lucide-react";
import { cn } from "@/utils/cn";

export default function EmptyState({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-3xl",
        "bg-white/50 dark:bg-gray-950/50 backdrop-blur-2xl",
        "border border-white/20 dark:border-white/5",
        "shadow-xl shadow-black/5 dark:shadow-black/20",
        "p-12 text-center animate-fade-in",
        className
      )}
    >
      <div className="relative">
        <CloudSun className="h-14 w-14 text-sky-400/40" strokeWidth={1.5} />
        <Search className="absolute -bottom-1 -right-1 h-5 w-5 text-muted-foreground/40" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-foreground">Search for a city</h3>
        <p className="text-xs text-muted-foreground/50 max-w-xs">
          Enter a city name above to see the current weather and 5-day forecast.
        </p>
      </div>
    </div>
  );
}
