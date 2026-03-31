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
        "flex flex-col items-center gap-1.5 rounded-2xl p-4 min-w-[120px] glass-card",
        "transition-all duration-300",
        "hover:scale-[1.03] hover:-translate-y-0.5",
        "hover:brightness-[1.02] dark:hover:brightness-110",
        animationClass
      )}
    >
      <span className="text-xs font-bold text-foreground/80 uppercase tracking-wider">
        {day.dayName}
      </span>

      <WeatherIcon icon={day.icon} description={day.description} size="md" />

      <div className="flex items-baseline gap-1">
        <span className="text-sm font-extrabold text-foreground">
          {formatTemperature(day.tempMax, unit)}
        </span>
        <span className="text-[10px] text-muted-foreground/50 font-semibold">
          {formatTemperature(day.tempMin, unit)}
        </span>
      </div>

      <span className="text-[10px] text-muted-foreground/50 text-center leading-tight font-medium">
        {capitalizeDescription(day.description)}
      </span>
    </article>
  );
}
