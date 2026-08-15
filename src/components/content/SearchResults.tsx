"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "@/components/content/ContentCard";
import { EmptyState } from "@/components/common/EmptyState";
import { SkeletonGrid } from "@/components/common/SkeletonCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/contentSlice";
import { TRANSLATIONS } from "@/lib/i18n";
import type { ContentSource } from "@/types";

export function SearchResults() {
  const dispatch = useAppDispatch();
  const { searchQuery, searchResults, searchStatus } = useAppSelector(
    (state) => state.content
  );
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [activeSourceTab, setActiveSourceTab] = useState<ContentSource | "all">("all");

  const filteredResults = useMemo(() => {
    if (activeSourceTab === "all") return searchResults;
    return searchResults.filter((item) => item.source === activeSourceTab);
  }, [searchResults, activeSourceTab]);

  const sourceCounts = useMemo(() => {
    return {
      all: searchResults.length,
      news: searchResults.filter((i) => i.source === "news").length,
      recommendation: searchResults.filter((i) => i.source === "recommendation").length,
      social: searchResults.filter((i) => i.source === "social").length,
    };
  }, [searchResults]);

  if (searchStatus === "loading") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-xs text-ink/50 dark:text-paper/50 font-mono">
          Searching across providers for &quot;{searchQuery}&quot;...
        </p>
        <SkeletonGrid count={6} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-line/10 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ink dark:text-paper">
            &quot;{searchQuery}&quot;
          </span>
          <span className="rounded-full bg-signal/20 px-2.5 py-0.5 font-mono text-xs font-bold text-ink dark:text-paper">
            {searchResults.length} {t.search.resultsFound}
          </span>
        </div>

        {/* Source breakdown tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: "all", label: "All" },
              { id: "news", label: t.sources.news },
              { id: "recommendation", label: t.sources.recommendation },
              { id: "social", label: t.sources.social },
            ] as const
          ).map((tab) => {
            const active = activeSourceTab === tab.id;
            const count = sourceCounts[tab.id];
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSourceTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-ink text-paper dark:bg-paper dark:text-ink shadow-sm"
                    : "text-ink/60 hover:bg-paper-dim dark:text-paper/60 dark:hover:bg-ink"
                }`}
              >
                <span>{tab.label}</span>
                <span className="rounded-full bg-black/10 dark:bg-white/20 px-1.5 py-0.2 font-mono text-[10px]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clear Search Action */}
        <button
          type="button"
          onClick={() => dispatch(setSearchQuery(""))}
          className="rounded-lg border border-ink-line/20 px-3 py-1 text-xs font-semibold text-ink hover:bg-paper dark:border-paper/20 dark:text-paper dark:hover:bg-ink transition-colors"
        >
          ✕ {t.search.clear}
        </button>
      </div>

      {/* Grid Results */}
      {filteredResults.length === 0 ? (
        <EmptyState
          title={t.search.noResults}
          description={`No results matching "${searchQuery}" in ${
            activeSourceTab === "all" ? "any category" : activeSourceTab
          }. Try a broader query or clearing filters.`}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredResults.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
