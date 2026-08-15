"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFeedSourceFilter,
  setFeedSortBy,
  resetFeedOrder,
  applyPendingLiveItems,
} from "@/store/slices/contentSlice";
import { setViewMode, setPaginationMode } from "@/store/slices/preferencesSlice";
import { setToastMessage } from "@/store/slices/realtimeSlice";
import { TRANSLATIONS } from "@/lib/i18n";
import type { ContentSource, ViewMode, PaginationMode } from "@/types";
import type { SortOption } from "@/store/slices/contentSlice";

export function FeedToolbar() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const currentSource = useAppSelector((state) => state.content.selectedSourceFilter);
  const currentSort = useAppSelector((state) => state.content.sortBy);
  const viewMode = useAppSelector((state) => state.preferences.viewMode);
  const paginationMode = useAppSelector((state) => state.preferences.paginationMode);
  const pendingCount = useAppSelector((state) => state.content.pendingLiveItems.length);

  const sourcesList: { id: ContentSource | "all"; label: string }[] = [
    { id: "all", label: t.search.allSources },
    { id: "news", label: t.sources.news },
    { id: "recommendation", label: t.sources.recommendation },
    { id: "social", label: t.sources.social },
  ];

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: "newest", label: t.sort.newest },
    { id: "trending", label: t.sort.trending },
    { id: "topRated", label: t.sort.topRated },
    { id: "mostDiscussed", label: t.sort.mostDiscussed },
  ];

  return (
    <div className="mb-6 flex flex-col gap-4">
      {/* Real-time incoming stories toast banner */}
      {pendingCount > 0 && (
        <button
          type="button"
          onClick={() => {
            dispatch(applyPendingLiveItems());
            dispatch(setToastMessage(`Loaded ${pendingCount} new stories into your feed`));
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-signal/20 border border-signal/60 px-4 py-2.5 text-xs font-bold text-ink transition-transform hover:scale-[1.01] active:scale-[0.99] dark:bg-signal/20 dark:text-paper"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-live animate-pulse-dot" />
          <span>
            {pendingCount} {t.realtime.newStoriesAvailable} ⚡
          </span>
        </button>
      )}

      {/* Main Filter & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-line/10 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70">
        {/* Source Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {sourcesList.map((s) => {
            const active = currentSource === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => dispatch(setFeedSourceFilter(s.id))}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-ink text-paper dark:bg-paper dark:text-ink shadow-sm"
                    : "text-ink/60 hover:bg-paper-dim dark:text-paper/60 dark:hover:bg-ink"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Right Tools: Sort, View Mode, Reset Order */}
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 text-xs text-ink/70 dark:text-paper/70">
            <span className="hidden sm:inline font-mono">{t.actions.sortBy}:</span>
            <select
              value={currentSort}
              onChange={(e) => dispatch(setFeedSortBy(e.target.value as SortOption))}
              className="rounded-lg border border-ink-line/15 bg-paper px-2.5 py-1 text-xs font-medium text-ink focus:outline-none focus:ring-1 focus:ring-signal dark:border-paper/15 dark:bg-ink dark:text-paper"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg border border-ink-line/15 bg-paper p-0.5 dark:border-paper/15 dark:bg-ink">
            {(["grid", "compact", "list"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => dispatch(setViewMode(mode))}
                aria-label={`View mode ${mode}`}
                className={`rounded px-2 py-0.5 text-xs capitalize ${
                  viewMode === mode
                    ? "bg-white text-ink shadow-sm dark:bg-ink-soft dark:text-paper font-semibold"
                    : "text-ink/50 hover:text-ink dark:text-paper/50 dark:hover:text-paper"
                }`}
              >
                {mode === "grid" ? "⊞" : mode === "compact" ? "⊟" : "☰"}
              </button>
            ))}
          </div>

          {/* Pagination Mode Toggle */}
          <button
            type="button"
            onClick={() =>
              dispatch(
                setPaginationMode(paginationMode === "infinite" ? "paged" : "infinite")
              )
            }
            title={paginationMode === "infinite" ? t.settings.infiniteScroll : t.settings.paged}
            className="flex items-center gap-1 rounded-lg border border-ink-line/15 bg-paper px-2.5 py-1 text-xs text-ink/70 hover:text-ink dark:border-paper/15 dark:bg-ink dark:text-paper/70"
          >
            <span>{paginationMode === "infinite" ? "♾️ Infinite" : "📄 Paged"}</span>
          </button>

          {/* Reset Drag Order */}
          <button
            type="button"
            onClick={() => {
              dispatch(resetFeedOrder());
              dispatch(setToastMessage(t.actions.reorderReset));
            }}
            title={t.actions.reorderReset}
            className="rounded-lg border border-ink-line/15 bg-paper p-1 text-ink/60 hover:bg-paper-dim hover:text-ink dark:border-paper/15 dark:bg-ink dark:text-paper/60"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
