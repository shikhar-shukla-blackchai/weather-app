# SkyCast — Weather Application

A production-grade weather application built with React 19, Vite, and Tailwind CSS v4. Search for any city worldwide to view real-time weather conditions and a 5-day forecast, with full dark mode support, unit toggling, and browser geolocation.

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | React | 19.2.0 |
| Build Tool | Vite | 7.3.1 |
| Styling | Tailwind CSS | 4.2.1 |
| UI Components | shadcn/ui | 4.0.0 |
| HTTP Client | Axios | 1.13.6 |
| Routing | React Router DOM | 7.13.1 |
| Icons | Lucide React | 0.577.0 |
| Utilities | clsx, tailwind-merge, class-variance-authority | latest |

## Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- An [OpenWeatherMap](https://openweathermap.org/api) API key (free tier)

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example file and add your API key:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and replace the placeholder with your OpenWeatherMap API key:

   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_OPENWEATHER_API_KEY` | OpenWeatherMap API key | Yes |
| `VITE_OPENWEATHER_BASE_URL` | Base URL for weather API endpoints | Yes |

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build for production into the `dist/` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |

## Project Structure

```
src/
├── api/
│   ├── axiosInstance.js       — Axios instances with interceptors for weather & geo APIs
│   └── weatherApi.js          — All API functions: current weather, forecast, geocoding
├── components/
│   ├── ui/                    — shadcn/ui auto-generated components
│   ├── layout/
│   │   ├── Header.jsx         — Sticky header with app branding, unit & theme toggles
│   │   ├── Layout.jsx         — Root layout wrapper with map background
│   │   └── MapBackground.jsx  — Full-viewport interactive map (mapcn/MapLibre)
│   ├── weather/
│   │   ├── CurrentWeather.jsx — Current conditions card with temp, icon, and stats
│   │   ├── WeatherIcon.jsx    — Weather icon renderer with fallback
│   │   ├── WeatherStats.jsx   — Humidity, pressure, visibility, feels-like grid
│   │   ├── WindCompass.jsx    — Animated SVG wind direction compass
│   │   ├── SunriseSunset.jsx  — Sunrise/sunset arc with sun position indicator
│   │   ├── TempTrendChart.jsx — SVG temperature range trend chart
│   │   ├── ForecastCard.jsx   — Individual day forecast card
│   │   └── ForecastList.jsx   — Horizontal scroll 5-day forecast row
│   ├── search/
│   │   ├── SearchBar.jsx      — Debounced autocomplete search with geolocation
│   │   └── SearchHistory.jsx  — Recent search chips with clear functionality
│   └── common/
│       ├── LoadingSpinner.jsx — Skeleton loading state
│       ├── ErrorMessage.jsx   — Error display with retry button
│       └── EmptyState.jsx     — Empty state illustration
├── context/
│   └── WeatherContext.jsx     — Global state: weather, forecast, unit, theme, history
├── hooks/
│   ├── useWeather.js          — Fetch current weather with loading/error states
│   ├── useForecast.js         — Fetch 5-day forecast with daily aggregation
│   ├── useGeolocation.js      — Browser geolocation with error handling
│   ├── useDebounce.js         — Debounce hook (400ms default)
│   └── useLocalStorage.js     — Persistent localStorage hook with JSON support
├── pages/
│   ├── Home.jsx               — Main page: search, current weather, forecast
│   └── NotFound.jsx           — 404 page with illustration
├── utils/
│   ├── formatWeather.js       — Data transformers for API responses
│   ├── constants.js           — App constants, API config, storage keys
│   └── cn.js                  — Re-export of className utility
├── styles/
│   └── globals.css            — Tailwind directives, CSS variables, theme definitions
├── App.jsx                    — Router configuration
└── main.jsx                   — Application entry point
```

## Features

- **Live Map Background** — Full-viewport CARTO map (via mapcn/MapLibre) that flies to each searched city
- **City Marker** — Animated pulsing marker at the searched city's coordinates
- **Weather-Aware Gradient** — Dynamic overlay that shifts color based on weather condition (amber for clear, blue for rain, etc.)
- **City Search** — Debounced autocomplete search powered by OpenWeatherMap geocoding API
- **Current Weather** — Real-time temperature, conditions, weather icon, and detailed stats
- **5-Day Forecast** — Daily forecast cards aggregated from 3-hour interval data
- **Temperature Trend Chart** — Pure SVG line chart showing high/low temperature range across 5 days
- **Wind Compass** — Animated SVG compass showing wind direction and speed
- **Sunrise/Sunset Arc** — Visual arc indicator with animated sun position tracking
- **Weather Statistics** — Humidity, pressure, visibility, and feels-like in a compact grid
- **Geolocation** — One-click browser location detection for local weather
- **Unit Toggle** — Switch between Celsius (metric) and Fahrenheit (imperial)
- **Dark Mode** — Full light/dark theme with system preference detection
- **Search History** — Last 5 searched cities stored in localStorage with chip UI
- **Glassmorphism UI** — Frosted-glass cards floating over the live map
- **Responsive Design** — Mobile-first layout optimized for all screen sizes
- **Accessible** — WCAG AA compliant with ARIA labels, keyboard navigation, and semantic HTML
- **Error Handling** — Graceful error states for network issues, 404s, and API errors

## API Reference

This app uses the [OpenWeatherMap Free Tier](https://openweathermap.org/api) with these endpoints:

| Endpoint | Purpose |
|---|---|
| `GET /weather?q={city}&appid={key}&units={units}` | Current weather by city name |
| `GET /weather?lat={lat}&lon={lon}&appid={key}&units={units}` | Current weather by coordinates |
| `GET /forecast?q={city}&appid={key}&units={units}` | 5-day / 3-hour forecast |
| `GET /geo/1.0/direct?q={city}&limit=5&appid={key}` | City geocoding for search autocomplete |

## Deployment

### Vercel

1. Push your code to a GitHub repository
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard:
   - `VITE_OPENWEATHER_API_KEY`
   - `VITE_OPENWEATHER_BASE_URL`
4. Deploy — Vite is auto-detected

### Netlify

1. Push your code to a GitHub repository
2. Import on [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in the Netlify dashboard
6. Deploy

For SPA routing, add a `public/_redirects` file:
