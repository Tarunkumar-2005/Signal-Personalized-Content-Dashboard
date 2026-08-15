"use client";

import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage } from "@/store/slices/preferencesSlice";
import type { SupportedLanguage } from "@/types";

const LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

export function LanguageSelector() {
  const currentLang = useAppSelector((state) => state.preferences.language);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select language"
        className="flex items-center gap-1.5 rounded-full border border-ink-line/15 bg-paper px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-signal/50 dark:border-paper/15 dark:bg-ink-soft dark:text-paper"
      >
        <span>{selected.flag}</span>
        <span className="hidden sm:inline">{selected.code.toUpperCase()}</span>
        <svg className="h-3 w-3 text-ink/50 dark:text-paper/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-ink-line/15 bg-white p-1 shadow-lg dark:border-paper/15 dark:bg-ink-soft">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                dispatch(setLanguage(lang.code));
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                currentLang === lang.code
                  ? "bg-signal/20 font-semibold text-ink dark:text-paper"
                  : "text-ink/70 hover:bg-paper dark:text-paper/70 dark:hover:bg-ink"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
