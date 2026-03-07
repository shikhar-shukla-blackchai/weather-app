import { Droplets, Wind, Gauge, Eye } from "lucide-react";
import { formatHumidity, formatWindSpeed, formatPressure, formatVisibility } from "@/utils/formatWeather";
import { cn } from "@/utils/cn";

const STAT_CONFIG = [
  { key: "humidity", Icon: Droplets, label: "Humidity", color: "text-blue-400" },
  { key: "wind", Icon: Wind, label: "Wind", color: "text-teal-400" },
  { key: "pressure", Icon: Gauge, label: "Pressure", color: "text-violet-400" },
  { key: "visibility", Icon: Eye, label: "Visibility", color: "text-amber-400" },
];

export default function WeatherStats({ weatherData, unit }) {
  if (!weatherData) return null;

  const stats = {
    humidity: formatHumidity(weatherData.humidity),
    wind: formatWindSpeed(weatherData.windSpeed, unit),
    pressure: formatPressure(weatherData.pressure),
    visibility: formatVisibility(weatherData.visibility),
  };

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {STAT_CONFIG.map((stat) => (
        <article
          key={stat.key}
          className={cn(
            "flex flex-col items-center gap-1 rounded-2xl p-3",
            "bg-white/40 dark:bg-white/5",
            "border border-white/15 dark:border-white/5",
            "transition-all duration-300",
            "hover:bg-white/60 dark:hover:bg-white/10 hover:scale-[1.02]"
          )}
        >
          <stat.Icon className={cn("h-4 w-4", stat.color)} aria-hidden="true" />
          <span className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider">{stat.label}</span>
          <span className="text-xs font-bold text-foreground">{stats[stat.key]}</span>
        </article>
      ))}
    </div>
  );
}
