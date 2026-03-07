import { CloudSun, Search } from "lucide-react";
import { cn } from "@/utils/cn";

export default function EmptyState({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl",
        "bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/20",
        "p-12 text-center animate-fade-in",
        className
      )}
    >
      <div className="relative">
        <CloudSun className="h-16 w-16 text-sky-400 opacity-60" strokeWidth={1.5} />
        <Search className="absolute -bottom-1 -right-1 h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-foreground">Search for a city</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Enter a city name above to see the current weather and 5-day forecast.
        </p>
      </div>
    </div>
  );
}
