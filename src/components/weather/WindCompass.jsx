import { cn } from "@/utils/cn";
import { formatWindSpeed, formatWindDirection } from "@/utils/formatWeather";

export default function WindCompass({ speed, deg, unit }) {
  const direction = formatWindDirection(deg);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-14 w-14">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" className="text-white/10 dark:text-white/5" strokeWidth="2" />

          {["N", "E", "S", "W"].map((label, i) => {
            const angle = i * 90;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = 50 + 38 * Math.cos(rad);
            const y = 50 + 38 * Math.sin(rad);
            return (
              <text
                key={label}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className={cn(
                  "text-[8px] font-bold",
                  label === "N" ? "fill-sky-400" : "fill-current text-muted-foreground/40"
                )}
              >
                {label}
              </text>
            );
          })}

          <line
            x1="50"
            y1="50"
            x2={50 + 24 * Math.cos(((deg || 0) - 90) * (Math.PI / 180))}
            y2={50 + 24 * Math.sin(((deg || 0) - 90) * (Math.PI / 180))}
            stroke="currentColor"
            className="text-sky-400"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />

          <circle cx="50" cy="50" r="3" className="fill-sky-400" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-xs font-bold text-foreground">
          {formatWindSpeed(speed, unit)}
        </p>
        <p className="text-[10px] text-muted-foreground/50 font-medium">
          {direction} {deg != null ? `${Math.round(deg)}°` : ""}
        </p>
      </div>
    </div>
  );
}
