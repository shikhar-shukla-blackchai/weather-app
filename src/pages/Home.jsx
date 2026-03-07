import { useWeatherContext } from "@/context/WeatherContext";
import Layout from "@/components/layout/Layout";
import SearchBar from "@/components/search/SearchBar";
import CurrentWeather from "@/components/weather/CurrentWeather";
import ForecastList from "@/components/weather/ForecastList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import EmptyState from "@/components/common/EmptyState";

export default function Home() {
  const { weatherData, forecastData, isLoading, error, geoError, searchCity, currentCity } =
    useWeatherContext();

  return (
    <Layout>
      <div className="space-y-6">
        <section aria-label="City search">
          <SearchBar />
        </section>

        {geoError && (
          <div
            className="rounded-xl bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 animate-fade-in"
            role="alert"
          >
            {geoError}
          </div>
        )}

        {isLoading && <LoadingSpinner />}

        {!isLoading && error && (
          <ErrorMessage
            message={error}
            onRetry={() => searchCity(currentCity)}
          />
        )}

        {!isLoading && !error && !weatherData && !forecastData && (
          <EmptyState />
        )}

        {!isLoading && !error && weatherData && (
          <CurrentWeather />
        )}

        {!isLoading && !error && forecastData && forecastData.length > 0 && (
          <ForecastList />
        )}
      </div>
    </Layout>
  );
}
