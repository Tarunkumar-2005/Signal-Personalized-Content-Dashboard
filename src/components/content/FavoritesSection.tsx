"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "@/components/content/ContentCard";
import { EmptyState } from "@/components/common/EmptyState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearAllFavorites,
  setFavoritesCategoryFilter,
  setFavoritesSourceFilter,
} from "@/store/slices/favoritesSlice";
import { setToastMessage } from "@/store/slices/realtimeSlice";
import { TRANSLATIONS } from "@/lib/i18n";
import type { ContentCategory, ContentSource } from "@/types";

export function FavoritesSection() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.favorites.items);
  const selectedCat = useAppSelector((state) => state.favorites.selectedCategoryFilter);
  const selectedSrc = useAppSelector((state) => state.favorites.selectedSourceFilter);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [searchFilter, setSearchFilter] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCat !== "all" && item.category !== selectedCat) return false;
      if (selectedSrc !== "all" && item.source !== selectedSrc) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [items, selectedCat, selectedSrc, searchFilter]);

  const handleExportJSON = () => {
    if (items.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "signal_favorites.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    dispatch(setToastMessage("Favorites exported to JSON!"));
  };

  const handleExportCSV = () => {
    if (items.length === 0) return;
    const headers = "ID,Source,Category,Title,Author,PublishedAt\n";
    const rows = items
      .map(
        (i) =>
          `"${i.id}","${i.source}","${i.category}","${i.title.replace(/"/g, '""')}","${i.author}","${i.publishedAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", url);
    downloadAnchor.setAttribute("download", "signal_favorites.csv");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    dispatch(setToastMessage("Favorites exported to CSV!"));
  };

  if (items.length === 0) {
    return (
      <EmptyState
        title="No saved favorites yet"
        description="Tap the heart icon on any story, track, or social post to build your private bookmark collection."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top Filter & Export Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-line/10 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70">
        {/* Search inside favorites */}
        <div className="relative min-w-[200px] flex-1">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter saved items..."
            className="w-full rounded-xl border border-ink-line/15 bg-paper px-3 py-1.5 text-xs text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-signal dark:border-paper/15 dark:bg-ink dark:text-paper"
          />
        </div>

        {/* Source selector */}
        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedSrc}
            onChange={(e) =>
              dispatch(setFavoritesSourceFilter(e.target.value as ContentSource | "all"))
            }
            className="rounded-lg border border-ink-line/15 bg-paper px-3 py-1.5 text-xs font-medium text-ink focus:outline-none dark:border-paper/15 dark:bg-ink dark:text-paper"
          >
            <option value="all">All Sources</option>
            <option value="news">News</option>
            <option value="recommendation">Recommendations</option>
            <option value="social">Social</option>
          </select>
        </div>

        {/* Export & Clear Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportJSON}
            className="rounded-lg border border-ink-line/15 bg-paper px-3 py-1.5 text-xs font-semibold text-ink hover:bg-paper-dim dark:border-paper/15 dark:bg-ink dark:text-paper dark:hover:bg-ink-soft"
          >
            ↓ JSON
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            className="rounded-lg border border-ink-line/15 bg-paper px-3 py-1.5 text-xs font-semibold text-ink hover:bg-paper-dim dark:border-paper/15 dark:bg-ink dark:text-paper dark:hover:bg-ink-soft"
          >
            ↓ CSV
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("Are you sure you want to clear all saved favorites?")) {
                dispatch(clearAllFavorites());
                dispatch(setToastMessage("Cleared all favorites"));
              }
            }}
            className="rounded-lg border border-live/30 px-3 py-1.5 text-xs font-semibold text-live hover:bg-live/10 transition-colors"
          >
            {t.actions.clearAll}
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No matching bookmarks"
          description="None of your saved favorites match the current search or source filter."
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
