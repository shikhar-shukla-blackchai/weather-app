import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export default function SearchHistory({ history, onSelect, onRemove, onClear }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="space-y-2 px-1 py-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Recent searches</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-auto py-0.5 px-1.5 text-xs text-muted-foreground hover:text-foreground"
          aria-label="Clear all search history"
        >
          Clear all
        </Button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {history.map((city) => (
          <Badge
            key={city}
            variant="secondary"
            className={cn(
              "cursor-pointer gap-1 pr-1 transition-all duration-200",
              "hover:bg-sky-100 dark:hover:bg-sky-900/30"
            )}
          >
            <button
              onClick={() => onSelect(city)}
              className="py-0.5 text-xs"
              aria-label={`Search for ${city}`}
            >
              {city}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(city);
              }}
              className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label={`Remove ${city} from history`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
