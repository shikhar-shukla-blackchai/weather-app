import { useWeatherContext } from "@/context/WeatherContext";
import ForecastCard from "./ForecastCard";

export default function ForecastList() {
  const { forecastData, unit } = useWeatherContext();

  if (!forecastData || forecastData.length === 0) return null;

  return (
    <section aria-label="5-day weather forecast" className="animate-fade-in">
      <h3 className="text-sm font-bold text-foreground/70 mb-3 uppercase tracking-wider">
        5-Day Forecast
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
        {forecastData.map((day, i) => (
          <div key={day.dt} className="snap-start flex-1 min-w-[120px]">
            <ForecastCard day={day} unit={unit} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
