"use client";

import { useEffect } from "react";

import { toggleDarkMode } from "@/store/slices/preferencesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function DarkModeToggle() {
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleDarkMode())}
      aria-pressed={darkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-16 items-center rounded-full border border-ink-line/20 bg-paper-dim px-1 transition-colors dark:border-paper/10 dark:bg-ink-soft"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper text-xs transition-transform dark:bg-signal dark:text-ink ${
          darkMode ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {darkMode ? "🌙" : "☀︎"}
      </span>
    </button>
  );
}
