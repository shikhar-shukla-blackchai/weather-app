import { Sun, Moon, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useWeatherContext } from "@/context/WeatherContext";
import { cn } from "@/utils/cn";

export default function Header() {
  const { unit, theme, toggleUnit, toggleTheme } = useWeatherContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl animate-slide-down">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <Cloud className="h-7 w-7 text-sky-500" strokeWidth={2} />
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            SkyCast
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleUnit}
                className={cn(
                  "relative h-9 w-[72px] rounded-full border-white/30 bg-white/50 dark:bg-white/10",
                  "text-sm font-semibold transition-all duration-300"
                )}
                aria-label={`Switch to ${unit === "metric" ? "Fahrenheit" : "Celsius"}`}
              >
                <span
                  className={cn(
                    "transition-colors duration-200",
                    unit === "metric" ? "text-sky-600 dark:text-sky-400" : "text-muted-foreground"
                  )}
                >
                  °C
                </span>
                <span className="mx-1 text-muted-foreground/40">|</span>
                <span
                  className={cn(
                    "transition-colors duration-200",
                    unit === "imperial" ? "text-sky-600 dark:text-sky-400" : "text-muted-foreground"
                  )}
                >
                  °F
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {unit === "metric" ? "Switch to Fahrenheit" : "Switch to Celsius"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9 rounded-full border-white/30 bg-white/50 dark:bg-white/10 transition-all duration-300"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4 transition-transform duration-300" />
                ) : (
                  <Sun className="h-4 w-4 transition-transform duration-300 text-amber-400" />
                )}
              </Button>
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
