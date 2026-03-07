import { useWeatherContext } from "@/context/WeatherContext";
import ForecastCard from "./ForecastCard";

export default function ForecastList() {
  const { forecastData, unit } = useWeatherContext();

  if (!forecastData || forecastData.length === 0) return null;

  return (
    <section aria-label="5-day weather forecast">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        5-Day Forecast
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
        {forecastData.map((day, i) => (
          <div key={day.dt} className="snap-start">
            <ForecastCard day={day} unit={unit} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
