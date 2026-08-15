"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { TRANSLATIONS } from "@/lib/i18n";
import type { ContentCategory, ContentSource } from "@/types";

export function AnalyticsSection() {
  const user = useAppSelector((state) => state.auth.user);
  const favorites = useAppSelector((state) => state.favorites.items);
  const feed = useAppSelector((state) => state.content.feed);
  const categories = useAppSelector((state) => state.preferences.categories);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    feed.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    favorites.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 2;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(counts).map(([cat, count]) => ({
      category: cat as ContentCategory,
      count,
      percentage: Math.round((count / total) * 100),
    }));
  }, [feed, favorites]);

  const sourceStats = useMemo(() => {
    const counts: Record<ContentSource, number> = {
      news: 0,
      recommendation: 0,
      social: 0,
    };
    feed.forEach((item) => {
      if (counts[item.source] !== undefined) counts[item.source] += 1;
    });
    const total = feed.length || 1;
    return (["news", "recommendation", "social"] as ContentSource[]).map((src) => ({
      source: src,
      count: counts[src],
      percentage: Math.round((counts[src] / total) * 100),
    }));
  }, [feed]);

  const topInterest = categoryStats.length > 0
    ? [...categoryStats].sort((a, b) => b.count - a.count)[0].category
    : "Technology";

  const totalReadingTimeEstimateMinutes = useMemo(() => {
    return user.readArticlesCount * 4;
  }, [user.readArticlesCount]);

  return (
    <div className="flex flex-col gap-6">
      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-ink-line/10 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70">
          <div className="flex items-center justify-between text-xs text-ink/50 dark:text-paper/50 font-mono">
            <span>{t.analytics.articlesRead}</span>
            <span className="text-base">📖</span>
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-ink dark:text-paper">
            {user.readArticlesCount}
          </p>
          <p className="mt-1 text-[11px] text-teal">
            ~{totalReadingTimeEstimateMinutes} mins total consumption
          </p>
        </div>

        <div className="rounded-2xl border border-ink-line/10 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70">
          <div className="flex items-center justify-between text-xs text-ink/50 dark:text-paper/50 font-mono">
            <span>{t.analytics.favoritesSaved}</span>
            <span className="text-base">♥</span>
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-live">
            {favorites.length}
          </p>
          <p className="mt-1 text-[11px] text-ink/50 dark:text-paper/50">
            Across {new Set(favorites.map((f) => f.category)).size} categories
          </p>
        </div>

        <div className="rounded-2xl border border-ink-line/10 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70">
          <div className="flex items-center justify-between text-xs text-ink/50 dark:text-paper/50 font-mono">
            <span>{t.analytics.topCategory}</span>
            <span className="text-base">🎯</span>
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-signal capitalize truncate">
            {t.categories[topInterest as ContentCategory] || topInterest}
          </p>
          <p className="mt-1 text-[11px] text-ink/50 dark:text-paper/50">
            {categories.length} active topics configured
          </p>
        </div>

        <div className="rounded-2xl border border-ink-line/10 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70">
          <div className="flex items-center justify-between text-xs text-ink/50 dark:text-paper/50 font-mono">
            <span>{t.analytics.streakDays}</span>
            <span className="text-base">🔥</span>
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-ink dark:text-paper">
            7 Days
          </p>
          <p className="mt-1 text-[11px] text-live">
            Daily engagement streak active
          </p>
        </div>
      </div>

      {/* Breakdown Section: Category Distribution & Source Allocation */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Interest Breakdown */}
        <div className="rounded-2xl border border-ink-line/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70">
          <h3 className="font-display text-base font-semibold text-ink dark:text-paper mb-4">
            {t.analytics.categoryBreakdown}
          </h3>
          <div className="space-y-4">
            {categoryStats.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink dark:text-paper capitalize">
                    {t.categories[item.category] || item.category}
                  </span>
                  <span className="font-mono text-ink/60 dark:text-paper/60">
                    {item.percentage}% ({item.count} items)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-paper-dim dark:bg-ink">
                  <div
                    className="h-full rounded-full bg-signal transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Source Feeds Breakdown */}
        <div className="rounded-2xl border border-ink-line/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-paper/10 dark:bg-ink-soft/70">
          <h3 className="font-display text-base font-semibold text-ink dark:text-paper mb-4">
            {t.analytics.sourceDistribution}
          </h3>
          <div className="space-y-5">
            {sourceStats.map((item) => {
              const colorClass = {
                news: "bg-teal",
                recommendation: "bg-signal",
                social: "bg-sky-500",
              }[item.source];

              return (
                <div key={item.source} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-ink dark:text-paper capitalize">
                      {t.sources[item.source]}
                    </span>
                    <span className="font-mono text-ink/60 dark:text-paper/60">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-paper-dim dark:bg-ink">
                    <div
                      className={`h-full rounded-full ${colorClass} transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl bg-paper-dim/60 p-4 text-xs text-ink/70 dark:bg-ink/60 dark:text-paper/70">
            <p className="font-semibold text-ink dark:text-paper mb-1">
              💡 AI Content Tip:
            </p>
            <p>
              Your current profile exhibits strong interest in Technology and Science. Consider adding Gaming or Business in your settings for broader domain coverage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
