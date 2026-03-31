import { cn } from "@/utils/cn";
import { formatTemperature } from "@/utils/formatWeather";

export default function TempTrendChart({ forecastData, unit }) {
  if (!forecastData || forecastData.length < 2) return null;

  const allTemps = forecastData.flatMap((d) => [d.tempMax, d.tempMin]);
  const globalMax = Math.max(...allTemps);
  const globalMin = Math.min(...allTemps);
  const range = globalMax - globalMin || 1;

  const width = 500;
  const height = 80;
  const padX = 30;
  const padY = 15;
  const plotW = width - padX * 2;
  const plotH = height - padY * 2;

  const getX = (i) => padX + (i / (forecastData.length - 1)) * plotW;
  const getY = (temp) => padY + plotH - ((temp - globalMin) / range) * plotH;

  const maxPath = forecastData.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.tempMax)}`).join(" ");
  const minPath = forecastData.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.tempMin)}`).join(" ");

  const areaPath = [
    ...forecastData.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.tempMax)}`),
    ...forecastData.map((d, i) => `L ${getX(forecastData.length - 1 - i)} ${getY(forecastData[forecastData.length - 1 - i].tempMin)}`),
    "Z",
  ].join(" ");

  return (
    <div className={cn(
      "rounded-2xl p-4 pt-3 animate-fade-in glass-card",
    )}>
      <h4 className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider mb-2">
        Temperature Range
      </h4>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-label="Temperature trend chart">
        <defs>
          <linearGradient id="tempAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#tempAreaGrad)" />

        <path d={maxPath} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={minPath} fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" strokeDasharray="4 3" />

        {forecastData.map((d, i) => (
          <g key={d.dt}>
            <circle cx={getX(i)} cy={getY(d.tempMax)} r="3.5" className="fill-sky-500" />
            <circle cx={getX(i)} cy={getY(d.tempMin)} r="2.5" className="fill-sky-400/40" />
            <text
              x={getX(i)}
              y={getY(d.tempMax) - 8}
              textAnchor="middle"
              className="fill-current text-foreground text-[9px] font-bold"
            >
              {formatTemperature(d.tempMax, unit)}
            </text>
            <text
              x={getX(i)}
              y={getY(d.tempMin) + 14}
              textAnchor="middle"
              className="fill-current text-muted-foreground/40 text-[8px] font-medium"
            >
              {formatTemperature(d.tempMin, unit)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
