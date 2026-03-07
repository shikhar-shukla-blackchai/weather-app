import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WeatherProvider } from "@/context/WeatherContext";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <TooltipProvider delayDuration={300}>
        <WeatherProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WeatherProvider>
      </TooltipProvider>
    </BrowserRouter>
  );
}
