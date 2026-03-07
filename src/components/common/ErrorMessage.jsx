import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export default function ErrorMessage({ message, onRetry, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-3xl",
        "bg-white/50 dark:bg-gray-950/50 backdrop-blur-2xl",
        "border border-white/20 dark:border-white/5",
        "shadow-xl shadow-black/5 dark:shadow-black/20",
        "p-8 text-center animate-fade-in",
        className
      )}
      role="alert"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-foreground">Something went wrong</h3>
        <p className="text-xs text-muted-foreground/60 max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-2 mt-1 rounded-xl bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10"
          aria-label="Retry loading weather data"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try Again
        </Button>
      )}
    </div>
  );
}
