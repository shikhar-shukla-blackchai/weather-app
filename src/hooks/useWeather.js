import { useState, useEffect, useCallback } from "react";
import { fetchCurrentWeather, fetchWeatherByCoords } from "@/api/weatherApi";

export function useWeather() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchByCity = useCallback(async (city, unit) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchCurrentWeather(city, unit);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchByCoords = useCallback(async (lat, lon, unit, locationLabel) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchWeatherByCoords(lat, lon, unit, locationLabel);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchByCity, fetchByCoords, setError };
}

export function useWeatherEffect(city, unit, fetchByCity) {
  useEffect(() => {
    if (city) {
      fetchByCity(city, unit);
    }
  }, [city, unit, fetchByCity]);
}
