import { Sun, Moon, Cloud } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useWeatherContext } from "@/context/WeatherContext";
import { cn } from "@/utils/cn";

export default function Header() {
  const { unit, theme, toggleUnit, toggleTheme } = useWeatherContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-white/5 bg-white/50 dark:bg-gray-950/50 backdrop-blur-2xl animate-slide-down shadow-sm shadow-black/5 dark:shadow-black/20">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 dark:bg-sky-400/10">
            <Cloud className="h-4.5 w-4.5 text-sky-600 dark:text-sky-400" strokeWidth={2.5} />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            SkyCast
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger
              onClick={toggleUnit}
              className={cn(
                "relative inline-flex h-8 w-16 items-center justify-center rounded-full px-0 cursor-pointer",
                "bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10",
                "text-xs font-bold transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              )}
              aria-label={`Switch to ${unit === "metric" ? "Fahrenheit" : "Celsius"}`}
            >
              <span
                className={cn(
                  "transition-colors duration-200",
                  unit === "metric" ? "text-sky-600 dark:text-sky-400" : "text-muted-foreground/50"
                )}
              >
                °C
              </span>
              <span className="mx-0.5 text-muted-foreground/30">|</span>
              <span
                className={cn(
                  "transition-colors duration-200",
                  unit === "imperial" ? "text-sky-600 dark:text-sky-400" : "text-muted-foreground/50"
                )}
              >
                °F
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {unit === "metric" ? "Switch to Fahrenheit" : "Switch to Celsius"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={toggleTheme}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full cursor-pointer",
                "bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10",
                "hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              )}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="h-3.5 w-3.5 transition-transform duration-300" />
              ) : (
                <Sun className="h-3.5 w-3.5 transition-transform duration-300 text-amber-400" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              {theme === "light" ? "Dark mode" : "Light mode"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
