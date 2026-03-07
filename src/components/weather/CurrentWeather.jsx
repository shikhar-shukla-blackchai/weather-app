import { useWeatherContext } from "@/context/WeatherContext";
import WeatherIcon from "./WeatherIcon";
import WeatherStats from "./WeatherStats";
import {
  formatTemperature,
  capitalizeDescription,
  formatTime,
} from "@/utils/formatWeather";
import { cn } from "@/utils/cn";

export default function CurrentWeather() {
  const { weatherData, unit } = useWeatherContext();

  if (!weatherData) return null;

  const {
    cityName,
    country,
    timestamp,
    timezone,
    temp,
    feelsLike,
    description,
    icon,
  } = weatherData;

  return (
    <section
      className={cn(
        "rounded-2xl p-6 md:p-8 animate-fade-in",
        "bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/20",
        "transition-all duration-300"
      )}
      aria-label="Current weather conditions"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {cityName}
              {country && (
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  {country}
                </span>
              )}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {formatTime(timestamp, timezone)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <WeatherIcon icon={icon} description={description} size="lg" />
            <div>
              <p className="text-5xl sm:text-6xl font-extrabold tracking-tighter text-foreground">
                {formatTemperature(temp, unit)}
              </p>
              <p className="text-base font-medium text-foreground/80 mt-1">
                {capitalizeDescription(description)}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Feels like{" "}
            <span className="font-medium text-foreground">
              {formatTemperature(feelsLike, unit)}
            </span>
          </p>
        </div>

        <div className="md:w-56 lg:w-64">
          <WeatherStats weatherData={weatherData} unit={unit} />
        </div>
      </div>
    </section>
  );
}
