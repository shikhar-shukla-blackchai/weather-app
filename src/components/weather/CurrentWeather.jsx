import { useWeatherContext } from "@/context/WeatherContext";
import WeatherIcon from "./WeatherIcon";
import WeatherStats from "./WeatherStats";
import WindCompass from "./WindCompass";
import SunriseSunset from "./SunriseSunset";
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
    description,
    icon,
    windSpeed,
    windDeg,
    sunrise,
    sunset,
  } = weatherData;

  return (
    <section
      className={cn(
        "rounded-3xl p-6 md:p-8 animate-fade-in glass-card",
        "transition-all duration-500"
      )}
      aria-label="Current weather conditions"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
        <div className="flex-1 space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {cityName}
              {country && (
                <span className="ml-2 text-sm font-medium text-muted-foreground/70 uppercase tracking-wide">
                  {country}
                </span>
              )}
            </h2>
            <p className="text-xs text-muted-foreground/60 mt-1 font-medium uppercase tracking-wider">
              {formatTime(timestamp, timezone)}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <WeatherIcon icon={icon} description={description} size="lg" className="shrink-0" />
            <div>
              <p className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-foreground leading-none">
                {formatTemperature(temp, unit)}
              </p>
              <p className="text-sm font-medium text-foreground/70 mt-2">
                {capitalizeDescription(description)}
              </p>
            </div>
          </div>

          <SunriseSunset sunrise={sunrise} sunset={sunset} timezone={timezone} />
        </div>

        <div className="flex flex-col gap-4 md:w-52 lg:w-56 shrink-0">
          <WeatherStats weatherData={weatherData} unit={unit} />

          <div
            className={cn(
              "flex items-center justify-center rounded-2xl p-3 glass-inset",
            )}
          >
            <WindCompass speed={windSpeed} deg={windDeg} unit={unit} />
          </div>
        </div>
      </div>
    </section>
  );
}
