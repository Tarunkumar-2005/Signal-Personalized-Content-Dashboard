"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleCategory,
  setCategories,
  toggleSource,
  setDarkMode,
  setViewMode,
  setPaginationMode,
  setAutoRefresh,
  setLanguage,
  resetPreferences,
} from "@/store/slices/preferencesSlice";
import { setToastMessage } from "@/store/slices/realtimeSlice";
import { TRANSLATIONS } from "@/lib/i18n";
import { CATEGORIES, SOURCES } from "@/lib/mockData";
import type { ContentCategory, ContentSource, PaginationMode, SupportedLanguage, ViewMode } from "@/types";

export function PreferencesPanel() {
  const dispatch = useAppDispatch();
  const {
    categories,
    sources,
    darkMode,
    viewMode,
    paginationMode,
    autoRefresh,
    language,
  } = useAppSelector((state) => state.preferences);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleSelectAll = () => {
    dispatch(setCategories([...CATEGORIES]));
    dispatch(setToastMessage("Enabled all categories"));
  };

  const handleTechFocus = () => {
    dispatch(setCategories(["technology", "science", "gaming"]));
    dispatch(setToastMessage("Applied Tech & Science preset"));
  };

  const handleReset = () => {
    if (confirm("Reset all dashboard preferences to default settings?")) {
      dispatch(resetPreferences());
      dispatch(setToastMessage("Preferences restored to default"));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Category Preferences */}
      <section
        aria-labelledby="preferences-categories-heading"
        className="rounded-2xl border border-ink-line/15 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2
              id="preferences-categories-heading"
              className="font-display text-lg font-bold text-ink dark:text-paper"
            >
              {t.settings.contentPreferences}
            </h2>
            <p className="mt-1 text-xs text-ink/60 dark:text-paper/60">
              {t.settings.categoriesDesc}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSelectAll}
              className="rounded-lg border border-ink-line/20 px-3 py-1 text-xs font-semibold text-ink hover:bg-paper dark:border-paper/20 dark:text-paper dark:hover:bg-ink"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={handleTechFocus}
              className="rounded-lg border border-ink-line/20 px-3 py-1 text-xs font-semibold text-ink hover:bg-paper dark:border-paper/20 dark:text-paper dark:hover:bg-ink"
            >
              Tech Preset
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {CATEGORIES.map((category: ContentCategory) => {
            const active = categories.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => dispatch(toggleCategory(category))}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-xs font-semibold capitalize transition-all ${
                  active
                    ? "border-signal bg-signal text-ink shadow-sm scale-105"
                    : "border-ink-line/20 bg-transparent text-ink/70 hover:border-signal/50 dark:border-paper/20 dark:text-paper/70"
                }`}
              >
                {active ? "✓ " : "+ "}
                {t.categories[category] || category}
              </button>
            );
          })}
        </div>

        {categories.length === 0 && (
          <p className="mt-3 text-xs font-medium text-live">
            ⚠️ Select at least one category to populate your personalized feed.
          </p>
        )}
      </section>

      {/* Connected Data Sources */}
      <section
        aria-labelledby="preferences-sources-heading"
        className="rounded-2xl border border-ink-line/15 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70"
      >
        <h2
          id="preferences-sources-heading"
          className="font-display text-lg font-bold text-ink dark:text-paper"
        >
          {t.settings.sourcesTitle}
        </h2>
        <p className="mt-1 text-xs text-ink/60 dark:text-paper/60">
          {t.settings.sourcesDesc}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {SOURCES.map((source: ContentSource) => {
            const active = sources.includes(source);
            return (
              <button
                key={source}
                type="button"
                onClick={() => dispatch(toggleSource(source))}
                aria-pressed={active}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                  active
                    ? "border-teal bg-teal/10 dark:border-teal/50 dark:bg-teal/10"
                    : "border-ink-line/15 bg-transparent opacity-60 dark:border-paper/15"
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-ink dark:text-paper capitalize">
                    {t.sources[source]}
                  </p>
                  <p className="text-[11px] text-ink/60 dark:text-paper/60 mt-0.5">
                    {source === "news"
                      ? "Breaking news wire API"
                      : source === "recommendation"
                      ? "TMDB / Spotify API"
                      : "Social media pulse"}
                  </p>
                </div>
                <span className="font-mono text-sm font-bold text-teal">
                  {active ? "ON" : "OFF"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Layout, Theme & Internationalization */}
      <section
        aria-labelledby="preferences-appearance-heading"
        className="rounded-2xl border border-ink-line/15 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70"
      >
        <h2
          id="preferences-appearance-heading"
          className="font-display text-lg font-bold text-ink dark:text-paper"
        >
          {t.settings.appearance}
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* View Density Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink dark:text-paper">
              {t.settings.density}
            </label>
            <div className="flex gap-2">
              {(["grid", "compact", "list"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => dispatch(setViewMode(mode))}
                  className={`flex-1 rounded-xl border py-2 text-xs font-semibold capitalize transition-colors ${
                    viewMode === mode
                      ? "border-signal bg-signal text-ink shadow-sm"
                      : "border-ink-line/20 text-ink/70 dark:border-paper/20 dark:text-paper/70 hover:bg-paper dark:hover:bg-ink"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Pagination Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink dark:text-paper">
              {t.settings.pagination}
            </label>
            <div className="flex gap-2">
              {(["infinite", "paged"] as PaginationMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => dispatch(setPaginationMode(mode))}
                  className={`flex-1 rounded-xl border py-2 text-xs font-semibold capitalize transition-colors ${
                    paginationMode === mode
                      ? "border-signal bg-signal text-ink shadow-sm"
                      : "border-ink-line/20 text-ink/70 dark:border-paper/20 dark:text-paper/70 hover:bg-paper dark:hover:bg-ink"
                  }`}
                >
                  {mode === "infinite" ? t.settings.infiniteScroll : t.settings.paged}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink dark:text-paper">
              {t.settings.language}
            </label>
            <select
              value={language}
              onChange={(e) =>
                dispatch(setLanguage(e.target.value as SupportedLanguage))
              }
              className="w-full rounded-xl border border-ink-line/20 bg-paper px-4 py-2.5 text-xs font-medium text-ink focus:outline-none focus:ring-1 focus:ring-signal dark:border-paper/20 dark:bg-ink dark:text-paper"
            >
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="ja">🇯🇵 日本語</option>
            </select>
          </div>

          {/* Real-time Auto-refresh */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink dark:text-paper">
              {t.settings.autoRefresh}
            </label>
            <button
              type="button"
              onClick={() => dispatch(setAutoRefresh(!autoRefresh))}
              className={`flex w-full items-center justify-between rounded-xl border p-2.5 text-xs font-semibold transition-colors ${
                autoRefresh
                  ? "border-teal bg-teal/10 text-ink dark:text-paper"
                  : "border-ink-line/20 text-ink/60 dark:border-paper/20 dark:text-paper/60"
              }`}
            >
              <span>{autoRefresh ? "Active Live Stream" : "Paused Stream"}</span>
              <span className="font-mono">{autoRefresh ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>

        {/* Reset Action */}
        <div className="mt-8 border-t border-ink-line/10 pt-4 dark:border-paper/10 flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-live/30 px-4 py-2 text-xs font-bold text-live hover:bg-live/10 transition-colors"
          >
            {t.settings.resetAll}
          </button>
        </div>
      </section>
    </div>
  );
}
