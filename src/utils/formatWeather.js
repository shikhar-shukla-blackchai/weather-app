import { API_CONFIG, UNITS } from "./constants";

export function getIconUrl(iconCode, size = "2x") {
  if (!iconCode) return "";
  return `${API_CONFIG.ICON_URL}/${iconCode}@${size}.png`;
}

export function formatTemperature(temp, unit = "metric") {
  if (temp == null) return "--";
  return `${Math.round(temp)}${UNITS[unit].label}`;
}

export function formatWindSpeed(speed, unit = "metric") {
  if (speed == null) return "--";
  return `${Math.round(speed * 10) / 10} ${UNITS[unit].speed}`;
}

export function formatVisibility(meters) {
  if (meters == null) return "--";
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${meters} m`;
}

export function formatWindDirection(deg) {
  if (deg == null) return "";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export function formatPressure(hPa) {
  if (hPa == null) return "--";
  return `${hPa} hPa`;
}

export function formatHumidity(percent) {
  if (percent == null) return "--";
  return `${percent}%`;
}

export function capitalizeDescription(desc) {
  if (!desc) return "";
  return desc.charAt(0).toUpperCase() + desc.slice(1);
}

export function formatDate(timestamp, timezoneOffset = 0) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatTime(timestamp, timezoneOffset = 0) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
}

export function getDayName(timestamp) {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function transformCurrentWeather(data) {
  return {
    cityName: data.name,
    country: data.sys?.country,
    timestamp: data.dt,
    timezone: data.timezone,
    temp: data.main?.temp,
    feelsLike: data.main?.feels_like,
    tempMin: data.main?.temp_min,
    tempMax: data.main?.temp_max,
    humidity: data.main?.humidity,
    pressure: data.main?.pressure,
    visibility: data.visibility,
    windSpeed: data.wind?.speed,
    windDeg: data.wind?.deg,
    condition: data.weather?.[0]?.main,
    description: data.weather?.[0]?.description,
    icon: data.weather?.[0]?.icon,
    sunrise: data.sys?.sunrise,
    sunset: data.sys?.sunset,
    coord: data.coord,
  };
}

export function transformForecast(data) {
  const dailyMap = new Map();
  const todayStr = new Date().toDateString();

  for (const slot of data.list) {
    const date = new Date(slot.dt * 1000);
    const dateStr = date.toDateString();

    if (dateStr === todayStr) continue;

    if (!dailyMap.has(dateStr)) {
      dailyMap.set(dateStr, { slots: [], dateStr });
    }
    dailyMap.get(dateStr).slots.push(slot);
  }

  const days = [];
  for (const [, { slots }] of dailyMap) {
    if (days.length >= 5) break;

    let noonSlot = slots[0];
    let minDiff = Infinity;
    for (const slot of slots) {
      const hour = new Date(slot.dt * 1000).getUTCHours();
      const diff = Math.abs(hour - 12);
      if (diff < minDiff) {
        minDiff = diff;
        noonSlot = slot;
      }
    }

    const temps = slots.map((s) => s.main.temp);
    days.push({
      dt: noonSlot.dt,
      dayName: getDayName(noonSlot.dt),
      date: formatDate(noonSlot.dt),
      icon: noonSlot.weather[0].icon,
      description: noonSlot.weather[0].description,
      condition: noonSlot.weather[0].main,
      tempMax: Math.max(...temps),
      tempMin: Math.min(...temps),
      humidity: noonSlot.main.humidity,
      windSpeed: noonSlot.wind.speed,
    });
  }

  return days;
}
