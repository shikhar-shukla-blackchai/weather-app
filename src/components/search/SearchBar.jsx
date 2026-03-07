import { useState, useRef, useEffect, useCallback, useMemo, useTransition } from "react";
import { Search, MapPin, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWeatherContext } from "@/context/WeatherContext";
import { useDebounce } from "@/hooks/useDebounce";
import { geocodeCity } from "@/api/weatherApi";
import SearchHistory from "./SearchHistory";
import { cn } from "@/utils/cn";

export default function SearchBar() {
  const {
    searchCity,
    detectLocation,
    searchHistory,
    removeFromHistory,
    clearHistory,
    geoLoading,
  } = useWeatherContext();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();

  const debouncedQuery = useDebounce(query, 400);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const trimmedDebounced = useMemo(() => debouncedQuery.trim(), [debouncedQuery]);

  useEffect(() => {
    if (!trimmedDebounced) return;

    let cancelled = false;

    geocodeCity(trimmedDebounced)
      .then((results) => {
        if (!cancelled) {
          startTransition(() => {
            setSuggestions(results);
            setIsOpen(true);
            setActiveIndex(-1);
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          startTransition(() => {
            setSuggestions([]);
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [trimmedDebounced]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (cityName) => {
      setQuery("");
      setSuggestions([]);
      setIsOpen(false);
      searchCity(cityName);
    },
    [searchCity]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        const s = suggestions[activeIndex];
        handleSelect(`${s.name}${s.state ? `, ${s.state}` : ""}, ${s.country}`);
      } else if (query.trim()) {
        handleSelect(query.trim());
      }
    },
    [query, activeIndex, suggestions, handleSelect]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" && query === "" && searchHistory.length > 0) {
          setIsOpen(true);
        }
        return;
      }

      const total = suggestions.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
          break;
        case "Escape":
          setIsOpen(false);
          setActiveIndex(-1);
          break;
        case "Enter":
          if (activeIndex >= 0 && suggestions[activeIndex]) {
            e.preventDefault();
            const s = suggestions[activeIndex];
            handleSelect(`${s.name}${s.state ? `, ${s.state}` : ""}, ${s.country}`);
          }
          break;
      }
    },
    [isOpen, suggestions, activeIndex, handleSelect, query, searchHistory.length]
  );

  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setSuggestions([]);
    }
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  }, []);

  const isFetching = isPending || (trimmedDebounced && query.trim() && trimmedDebounced !== query.trim());
  const showHistory = isOpen && !query.trim() && searchHistory.length > 0 && suggestions.length === 0;
  const showSuggestions = isOpen && suggestions.length > 0;

  return (
    <div className="relative w-full animate-fade-in">
      <form onSubmit={handleSubmit} role="search" aria-label="Search for a city">
        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a city..."
            className={cn(
              "h-12 pl-11 pr-24 rounded-xl text-base",
              "bg-white/70 dark:bg-white/10 backdrop-blur-sm",
              "border-white/30 dark:border-white/20",
              "placeholder:text-muted-foreground/60",
              "focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:border-sky-500/50",
              "transition-all duration-200"
            )}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="search-dropdown"
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
            aria-label="City search input"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isFetching && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={detectLocation}
              disabled={geoLoading}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                geoLoading
                  ? "text-sky-500 animate-pulse"
                  : "text-muted-foreground hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20"
              )}
              aria-label="Detect my location"
            >
              {geoLoading ? (
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
              ) : (
                <MapPin className="h-4.5 w-4.5" />
              )}
            </button>
          </div>
        </div>
      </form>

      {(showSuggestions || showHistory) && (
        <div
          ref={dropdownRef}
          id="search-dropdown"
          role="listbox"
          className={cn(
            "absolute z-50 mt-2 w-full rounded-xl shadow-lg",
            "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl",
            "border border-white/30 dark:border-white/10",
            "animate-slide-up overflow-hidden"
          )}
        >
          {showSuggestions && (
            <ul className="py-1">
              {suggestions.map((item, i) => (
                <li
                  key={`${item.name}-${item.lat}-${item.lon}`}
                  id={`suggestion-${i}`}
                  role="option"
                  aria-selected={i === activeIndex}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors",
                    i === activeIndex
                      ? "bg-sky-50 dark:bg-sky-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-white/5"
                  )}
                  onClick={() =>
                    handleSelect(
                      `${item.name}${item.state ? `, ${item.state}` : ""}, ${item.country}`
                    )
                  }
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">
                      {item.name}
                    </span>
                    {(item.state || item.country) && (
                      <span className="text-xs text-muted-foreground ml-1.5">
                        {[item.state, item.country].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {showHistory && (
            <SearchHistory
              history={searchHistory}
              onSelect={handleSelect}
              onRemove={removeFromHistory}
              onClear={clearHistory}
            />
          )}
        </div>
      )}
    </div>
  );
}
