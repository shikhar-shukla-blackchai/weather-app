import { Droplets, Wind, Gauge, Eye } from "lucide-react";
import { formatHumidity, formatWindSpeed, formatPressure, formatVisibility } from "@/utils/formatWeather";
import { cn } from "@/utils/cn";

const STAT_CONFIG = [
  { key: "humidity", Icon: Droplets, label: "Humidity", color: "text-blue-500" },
  { key: "wind", Icon: Wind, label: "Wind Speed", color: "text-teal-500" },
  { key: "pressure", Icon: Gauge, label: "Pressure", color: "text-purple-500" },
  { key: "visibility", Icon: Eye, label: "Visibility", color: "text-amber-500" },
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
    <div className="grid grid-cols-2 gap-3">
      {STAT_CONFIG.map((stat) => (
        <article
          key={stat.key}
          className={cn(
            "flex flex-col items-center gap-1.5 rounded-xl p-3",
            "bg-white/40 dark:bg-white/5 border border-white/20",
            "transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/10"
          )}
        >
          <stat.Icon className={cn("h-5 w-5", stat.color)} aria-hidden="true" />
          <span className="text-xs text-muted-foreground">{stat.label}</span>
          <span className="text-sm font-semibold text-foreground">{stats[stat.key]}</span>
        </article>
      ))}
    </div>
  );
}
