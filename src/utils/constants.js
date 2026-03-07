export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_OPENWEATHER_BASE_URL,
  API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
  GEO_URL: "https://api.openweathermap.org/geo/1.0",
  ICON_URL: "https://openweathermap.org/img/wn",
};

export const DEFAULT_CITY = "London";

export const UNITS = {
  metric: {
    label: "°C",
    speed: "m/s",
    temp: "metric",
  },
  imperial: {
    label: "°F",
    speed: "mph",
    temp: "imperial",
  },
};

export const MAX_SEARCH_HISTORY = 5;
export const DEBOUNCE_DELAY = 400;
export const MAX_SUGGESTIONS = 5;

export const STORAGE_KEYS = {
  THEME: "skycast-theme",
  UNIT: "skycast-unit",
  SEARCH_HISTORY: "skycast-search-history",
  LAST_CITY: "skycast-last-city",
};
