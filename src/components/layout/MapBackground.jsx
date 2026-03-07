import { useEffect, useRef, useMemo } from "react";
import { Map, useMap, MapMarker, MarkerContent } from "@/components/ui/map";
import { useWeatherContext } from "@/context/WeatherContext";
import { MapPin } from "lucide-react";

const WEATHER_GRADIENTS = {
  Clear: {
    light: "from-amber-100/20 via-sky-100/15 to-transparent",
    dark: "from-amber-900/15 via-sky-950/10 to-transparent",
  },
  Clouds: {
    light: "from-slate-200/25 via-gray-100/15 to-transparent",
    dark: "from-slate-900/20 via-gray-950/10 to-transparent",
  },
  Rain: {
    light: "from-blue-200/25 via-indigo-100/15 to-transparent",
    dark: "from-blue-950/20 via-indigo-950/10 to-transparent",
  },
  Drizzle: {
    light: "from-blue-100/20 via-cyan-100/15 to-transparent",
    dark: "from-blue-950/15 via-cyan-950/10 to-transparent",
  },
  Thunderstorm: {
    light: "from-purple-200/25 via-slate-200/20 to-transparent",
    dark: "from-purple-950/25 via-slate-950/15 to-transparent",
  },
  Snow: {
    light: "from-sky-100/20 via-white/15 to-transparent",
    dark: "from-sky-950/15 via-slate-950/10 to-transparent",
  },
  Mist: {
    light: "from-gray-200/30 via-slate-100/20 to-transparent",
    dark: "from-gray-900/25 via-slate-950/15 to-transparent",
  },
  Haze: {
    light: "from-amber-100/25 via-gray-100/15 to-transparent",
    dark: "from-amber-950/15 via-gray-950/10 to-transparent",
  },
  default: {
    light: "from-white/15 via-transparent to-transparent",
    dark: "from-gray-950/15 via-transparent to-transparent",
  },
};

function getWeatherGradient(condition) {
  return WEATHER_GRADIENTS[condition] || WEATHER_GRADIENTS.default;
}

function FlyToCity() {
  const { map, isLoaded } = useMap();
  const { weatherData } = useWeatherContext();
  const prevCoords = useRef(null);

  useEffect(() => {
    if (!map || !isLoaded || !weatherData?.coord) return;

    const { lon, lat } = weatherData.coord;
    if (
      prevCoords.current &&
      prevCoords.current.lon === lon &&
      prevCoords.current.lat === lat
    ) {
      return;
    }

    prevCoords.current = { lon, lat };

    map.flyTo({
      center: [lon, lat],
      zoom: 10,
      speed: 1.2,
      curve: 1.4,
      essential: true,
    });
  }, [map, isLoaded, weatherData?.coord]);

  return null;
}

function CityMarker() {
  const { weatherData } = useWeatherContext();

  if (!weatherData?.coord) return null;

  return (
    <MapMarker
      longitude={weatherData.coord.lon}
      latitude={weatherData.coord.lat}
    >
      <MarkerContent className="animate-in fade-in-0 zoom-in-50 duration-500">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-8 w-8 rounded-full bg-sky-500/30 animate-ping" />
          <span className="absolute h-6 w-6 rounded-full bg-sky-500/20" />
          <MapPin className="h-6 w-6 text-sky-500 drop-shadow-lg" fill="currentColor" strokeWidth={1.5} />
        </div>
      </MarkerContent>
    </MapMarker>
  );
}

function WeatherOverlay() {
  const { weatherData, theme } = useWeatherContext();

  const gradientClass = useMemo(() => {
    const gradient = getWeatherGradient(weatherData?.condition);
    return theme === "dark" ? gradient.dark : gradient.light;
  }, [weatherData?.condition, theme]);

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-b ${gradientClass} pointer-events-none transition-all duration-1000`}
    />
  );
}

export default function MapBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Map
        center={[0, 30]}
        zoom={3}
        minZoom={2}
        maxZoom={14}
        interactive={false}
        className="h-full w-full"
      >
        <FlyToCity />
        <CityMarker />
      </Map>
      <WeatherOverlay />
    </div>
  );
}
