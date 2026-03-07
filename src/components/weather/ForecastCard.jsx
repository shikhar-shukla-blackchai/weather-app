import WeatherIcon from "./WeatherIcon";
import { formatTemperature, capitalizeDescription } from "@/utils/formatWeather";
import { cn } from "@/utils/cn";

export default function ForecastCard({ day, unit, index }) {
  const animationClass = [
    "animate-stagger-1",
    "animate-stagger-2",
    "animate-stagger-3",
    "animate-stagger-4",
    "animate-stagger-5",
  ][index] || "animate-stagger-5";

  return (
    <article
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl p-4 min-w-[130px]",
        "bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/20",
        "transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/15",
        "hover:scale-[1.02]",
        animationClass
      )}
    >
      <span className="text-sm font-semibold text-foreground">
        {day.dayName}
      </span>

      <WeatherIcon icon={day.icon} description={day.description} size="md" />

      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-foreground">
          {formatTemperature(day.tempMax, unit)}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatTemperature(day.tempMin, unit)}
        </span>
      </div>

      <span className="text-xs text-muted-foreground text-center leading-tight">
        {capitalizeDescription(day.description)}
      </span>
    </article>
  );
}
