import { Clock, X } from "lucide-react";
import { cn } from "@/utils/cn";

export default function SearchHistory({ history, onSelect, onRemove, onClear }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="p-2">
      <div className="flex items-center justify-between px-2 pt-1 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/70">
          Recent
        </p>
        <button
          type="button"
          onClick={onClear}
          className={cn(
            "text-[11px] font-medium text-muted-foreground/80",
            "hover:text-sky-600 dark:hover:text-sky-400 transition-colors",
            "rounded-md px-1.5 py-0.5 hover:bg-black/4 dark:hover:bg-white/6"
          )}
          aria-label="Clear all search history"
        >
          Clear all
        </button>
      </div>
      <ul className="space-y-1" role="list">
        {history.map((city) => (
          <li
            key={city}
            className={cn(
              "group flex items-center gap-2 rounded-xl px-2 py-2",
              "hover:bg-black/4 dark:hover:bg-white/6 transition-colors"
            )}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/6 text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden="true" />
            </span>
            <button
              type="button"
              onClick={() => onSelect(city)}
              className="min-w-0 flex-1 text-left text-sm font-medium text-foreground truncate py-0.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
              aria-label={`Search for ${city}`}
            >
              {city}
            </button>
            <button
              type="button"
              onClick={() => onRemove(city)}
              className={cn(
                "shrink-0 rounded-lg p-1.5 text-muted-foreground/70",
                "sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100",
                "hover:bg-white/80 dark:hover:bg-white/10 hover:text-foreground transition-colors"
              )}
              aria-label={`Remove ${city} from history`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
