import { useState, useCallback } from "react";
import { fetchForecast, fetchForecastByCoords } from "@/api/weatherApi";

export function useForecast() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchByCity = useCallback(async (city, unit) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchForecast(city, unit);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchByCoords = useCallback(async (lat, lon, unit) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchForecastByCoords(lat, lon, unit);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchByCity, fetchByCoords };
}
