import { Droplets, Gauge, Eye, Thermometer } from "lucide-react";
import { formatHumidity, formatPressure, formatVisibility, formatTemperature } from "@/utils/formatWeather";
import { cn } from "@/utils/cn";

const STAT_CONFIG = [
  { key: "humidity", Icon: Droplets, label: "Humidity", color: "text-blue-400" },
  { key: "pressure", Icon: Gauge, label: "Pressure", color: "text-violet-400" },
  { key: "visibility", Icon: Eye, label: "Visibility", color: "text-amber-400" },
  { key: "feelsLike", Icon: Thermometer, label: "Feels like", color: "text-rose-400" },
];

export default function WeatherStats({ weatherData, unit }) {
  if (!weatherData) return null;

  const stats = {
    humidity: formatHumidity(weatherData.humidity),
    pressure: formatPressure(weatherData.pressure),
    visibility: formatVisibility(weatherData.visibility),
    feelsLike: formatTemperature(weatherData.feelsLike, unit),
  };

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {STAT_CONFIG.map((stat) => (
        <article
          key={stat.key}
          className={cn(
            "flex flex-col items-center gap-1 rounded-2xl p-3 glass-inset",
            "transition-all duration-300",
            "hover:brightness-[1.03] hover:scale-[1.02]"
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
