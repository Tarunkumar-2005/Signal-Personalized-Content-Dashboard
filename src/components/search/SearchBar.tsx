"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  executeSearch,
  setSearchQuery,
  addSearchHistory,
} from "@/store/slices/contentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TRANSLATIONS } from "@/lib/i18n";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector((state) => state.content.searchHistory);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
    if (debouncedQuery.trim().length > 0) {
      dispatch(executeSearch(debouncedQuery));
      dispatch(addSearchHistory(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery("");
    dispatch(setSearchQuery(""));
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <label htmlFor="dashboard-search" className="sr-only">
        {t.search.placeholder}
      </label>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3.5 text-ink/40 dark:text-paper/40">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          id="dashboard-search"
          type="search"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search.placeholder}
          className="w-full rounded-full border border-ink-line/20 bg-paper-dim py-2 pl-9 pr-8 text-xs text-ink placeholder:text-ink/40 focus:border-signal focus:bg-white focus:outline-none focus:ring-2 focus:ring-signal/30 dark:border-paper/15 dark:bg-ink-soft dark:text-paper dark:placeholder:text-paper/40 dark:focus:bg-ink"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 flex h-4 w-4 items-center justify-center rounded-full bg-ink/20 text-[10px] text-ink hover:bg-ink/30 dark:bg-paper/20 dark:text-paper"
          >
            ✕
          </button>
        )}
      </div>

      {/* Autocomplete / Recent Searches Dropdown */}
      {isFocused && !query && searchHistory.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-ink-line/15 bg-white p-2 shadow-xl backdrop-blur dark:border-paper/15 dark:bg-ink-soft">
          <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-ink/50 dark:text-paper/50 font-mono">
            <span>{t.search.recentSearches}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 p-1.5">
            {searchHistory.map((item) => (
              <button
                key={item}
                type="button"
                onMouseDown={() => handleSelectSuggestion(item)}
                className="flex items-center gap-1 rounded-full bg-paper px-3 py-1 text-xs text-ink hover:bg-signal/20 dark:bg-ink dark:text-paper dark:hover:bg-signal/20 transition-colors"
              >
                <span>🔍</span>
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
