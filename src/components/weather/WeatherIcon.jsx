import { CloudOff } from "lucide-react";
import { getIconUrl } from "@/utils/formatWeather";
import { cn } from "@/utils/cn";

export default function WeatherIcon({ icon, description, size = "lg", className }) {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  if (!icon) {
    return (
      <div className={cn("flex items-center justify-center", sizeClasses[size], className)}>
        <CloudOff className="h-1/2 w-1/2 text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      src={getIconUrl(icon)}
      alt={description || "Weather condition"}
      className={cn("drop-shadow-lg", sizeClasses[size], className)}
      loading="lazy"
    />
  );
}
