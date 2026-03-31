import { createContext, useContext, useCallback, useEffect, useRef } from "react";
import { useWeather } from "@/hooks/useWeather";
import { useForecast } from "@/hooks/useForecast";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DEFAULT_CITY, MAX_SEARCH_HISTORY, STORAGE_KEYS } from "@/utils/constants";

const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  const [unit, setUnit] = useLocalStorage(STORAGE_KEYS.UNIT, "metric");
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, () => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });
  const [searchHistory, setSearchHistory] = useLocalStorage(STORAGE_KEYS.SEARCH_HISTORY, []);
  const [currentCity, setCurrentCity] = useLocalStorage(STORAGE_KEYS.LAST_CITY, "");

  const weather = useWeather();
  const forecast = useForecast();
  const geo = useGeolocation();

  const addToHistoryRef = useRef(null);

  const addToHistory = useCallback(
    (city) => {
      setSearchHistory((prev) => {
        const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
        return [city, ...filtered].slice(0, MAX_SEARCH_HISTORY);
      });
    },
    [setSearchHistory]
  );

  useEffect(() => {
    addToHistoryRef.current = addToHistory;
  }, [addToHistory]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const city = currentCity || DEFAULT_CITY;
    weather.fetchByCity(city, unit);
    forecast.fetchByCity(city, unit);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (geo.coords) {
      weather.fetchByCoords(geo.coords.lat, geo.coords.lon, unit);
      forecast.fetchByCoords(geo.coords.lat, geo.coords.lon, unit);
    }
  }, [geo.coords]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (geo.coords && weather.data?.cityName) {
      setCurrentCity(weather.data.cityName);
      addToHistoryRef.current?.(weather.data.cityName);
    }
  }, [weather.data?.cityName, geo.coords, setCurrentCity]);

  const searchCity = useCallback(
    async (cityName) => {
      if (!cityName?.trim()) return;
      const trimmed = cityName.trim();
      setCurrentCity(trimmed);
      addToHistory(trimmed);
      await Promise.all([
        weather.fetchByCity(trimmed, unit),
        forecast.fetchByCity(trimmed, unit),
      ]);
    },
    [unit, weather, forecast, setCurrentCity, addToHistory]
  );

  const searchByCoords = useCallback(
    async (suggestion) => {
      const { lat, lon, name, state, country } = suggestion;
      const displayName = `${name}${state ? `, ${state}` : ""}, ${country}`;
      setCurrentCity(displayName);
      addToHistory(displayName);
      const locationLabel = { cityName: name, country };
      await Promise.all([
        weather.fetchByCoords(lat, lon, unit, locationLabel),
        forecast.fetchByCoords(lat, lon, unit),
      ]);
    },
    [unit, weather, forecast, setCurrentCity, addToHistory]
  );

  const detectLocation = useCallback(() => {
    geo.getLocation();
  }, [geo]);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => {
      const next = prev === "metric" ? "imperial" : "metric";
      const city = currentCity || DEFAULT_CITY;
      weather.fetchByCity(city, next);
      forecast.fetchByCity(city, next);
      return next;
    });
  }, [currentCity, weather, forecast, setUnit]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  const removeFromHistory = useCallback(
    (city) => {
      setSearchHistory((prev) => prev.filter((c) => c !== city));
    },
    [setSearchHistory]
  );

  const value = {
    currentCity: currentCity || DEFAULT_CITY,
    weatherData: weather.data,
    forecastData: forecast.data,
    isLoading: weather.isLoading || forecast.isLoading,
    error: weather.error || forecast.error,
    unit,
    theme,
    searchHistory,
    geoError: geo.error,
    geoLoading: geo.isLoading,
    searchCity,
    searchByCoords,
    detectLocation,
    toggleUnit,
    toggleTheme,
    clearHistory,
    removeFromHistory,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
}
