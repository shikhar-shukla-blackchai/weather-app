import { useWeatherContext } from "@/context/WeatherContext";
import Layout from "@/components/layout/Layout";
import SearchBar from "@/components/search/SearchBar";
import CurrentWeather from "@/components/weather/CurrentWeather";
import ForecastList from "@/components/weather/ForecastList";
import TempTrendChart from "@/components/weather/TempTrendChart";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import EmptyState from "@/components/common/EmptyState";

export default function Home() {
  const { weatherData, forecastData, isLoading, error, geoError, searchCity, currentCity, unit } =
    useWeatherContext();

  return (
    <Layout>
      <div className="space-y-5">
        <section aria-label="City search" className="relative z-40">
          <SearchBar />
        </section>

        {geoError && (
          <div
            className="rounded-2xl bg-amber-50/70 dark:bg-amber-900/20 backdrop-blur-xl border border-amber-200/30 dark:border-amber-800/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 animate-fade-in"
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

        {!isLoading && !error && forecastData && forecastData.length > 1 && (
          <TempTrendChart forecastData={forecastData} unit={unit} />
        )}

        {!isLoading && !error && forecastData && forecastData.length > 0 && (
          <ForecastList />
        )}
      </div>
    </Layout>
  );
}
