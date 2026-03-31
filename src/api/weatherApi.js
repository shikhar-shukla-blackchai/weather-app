import { weatherClient, geoClient } from "./axiosInstance";
import { transformCurrentWeather, transformForecast } from "@/utils/formatWeather";
import { MAX_SUGGESTIONS } from "@/utils/constants";

export async function fetchCurrentWeather(city, unit = "metric") {
  const { data } = await weatherClient.get("/weather", {
    params: { q: city, units: unit },
  });
  return transformCurrentWeather(data);
}

export async function fetchForecast(city, unit = "metric") {
  const { data } = await weatherClient.get("/forecast", {
    params: { q: city, units: unit },
  });
  return transformForecast(data);
}

/**
 * @param {{ cityName?: string, country?: string }} [locationLabel] - From geocoding when user picks a suggestion, so UI shows "Tokyo" not a district name from reverse lookup.
 */
export async function fetchWeatherByCoords(lat, lon, unit = "metric", locationLabel) {
  const { data } = await weatherClient.get("/weather", {
    params: { lat, lon, units: unit },
  });
  return transformCurrentWeather(data, locationLabel);
}

export async function fetchForecastByCoords(lat, lon, unit = "metric") {
  const { data } = await weatherClient.get("/forecast", {
    params: { lat, lon, units: unit },
  });
  return transformForecast(data);
}

export async function geocodeCity(cityName) {
  const { data } = await geoClient.get("/direct", {
    params: { q: cityName, limit: MAX_SUGGESTIONS },
  });
  return data.map((item) => ({
    name: item.name,
    state: item.state || "",
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }));
}
