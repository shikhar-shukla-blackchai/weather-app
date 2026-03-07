import { useState, useEffect } from "react";
import { Sunrise, Sunset } from "lucide-react";
import { formatTime } from "@/utils/formatWeather";

export default function SunriseSunset({ sunrise, sunset, timezone }) {
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!sunrise || !sunset) return null;

  const localNow = now + (timezone || 0);
  const localSunrise = sunrise + (timezone || 0);
  const localSunset = sunset + (timezone || 0);
  const dayLength = localSunset - localSunrise;
  const elapsed = Math.max(0, Math.min(dayLength, localNow - localSunrise));
  const progress = dayLength > 0 ? (elapsed / dayLength) * 100 : 0;
  const isDaytime = localNow >= localSunrise && localNow <= localSunset;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-10">
        <svg viewBox="0 0 200 50" className="w-full h-full" aria-label="Sun position arc showing sunrise to sunset progress">
          <path
            d="M 10 40 Q 100 -5 190 40"
            fill="none"
            stroke="currentColor"
            className="text-white/10 dark:text-white/5"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M 10 40 Q 100 -5 190 40"
            fill="none"
            stroke="url(#sunGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="280"
            strokeDashoffset={280 - (280 * Math.min(progress, 100)) / 100}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />

          <defs>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {isDaytime && (
            <circle
              cx={10 + (180 * progress) / 100}
              cy={40 - 45 * Math.sin((Math.PI * progress) / 100)}
              r="5"
              className="fill-amber-400"
              style={{ transition: "all 1s ease-out" }}
            >
              <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sunrise className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-[10px] font-semibold text-foreground/70">
            {formatTime(sunrise, timezone)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sunset className="h-3.5 w-3.5 text-orange-400" />
          <span className="text-[10px] font-semibold text-foreground/70">
            {formatTime(sunset, timezone)}
          </span>
        </div>
      </div>
    </div>
  );
}
