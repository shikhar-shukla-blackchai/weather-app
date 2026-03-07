import { useEffect, useRef } from "react";
import { Map, useMap, MapMarker, MarkerContent } from "@/components/ui/map";
import { useWeatherContext } from "@/context/WeatherContext";
import { MapPin } from "lucide-react";

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
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-950/60 backdrop-blur-[2px] pointer-events-none" />
    </div>
  );
}
