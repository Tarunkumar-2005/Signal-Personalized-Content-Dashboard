"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { ContentFeed } from "@/components/content/ContentFeed";
import { FavoritesSection } from "@/components/content/FavoritesSection";
import { SearchResults } from "@/components/content/SearchResults";
import { TrendingStrip } from "@/components/content/TrendingStrip";
import { AnalyticsSection } from "@/components/analytics/AnalyticsSection";
import { PreferencesPanel } from "@/components/settings/PreferencesPanel";
import { useAppSelector } from "@/store/hooks";
import { TRANSLATIONS } from "@/lib/i18n";

function SectionHeading({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-2">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-paper sm:text-3xl">
            {title}
          </h1>
          {badge && (
            <span className="rounded-full bg-signal/20 px-2.5 py-0.5 font-mono text-xs font-bold text-signal">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1.5 text-xs text-ink/65 dark:text-paper/65 sm:text-sm max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const isSearching = useAppSelector((state) => state.content.searchQuery.length > 0);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (isSearching) {
    return (
      <DashboardShell>
        <SectionHeading
          title={t.headers.searchResults}
          description={t.headers.searchDesc}
          badge="Live Query"
        />
        <SearchResults />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {activeSection === "feed" && (
        <>
          <SectionHeading
            title={t.headers.yourFeed}
            description={t.headers.feedDesc}
            badge="Personalized"
          />

          {/* Trending Strip embedded above feed */}
          <div className="mb-8 rounded-2xl border border-ink-line/10 bg-paper-dim/40 p-4 dark:border-paper/10 dark:bg-ink-soft/40">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-paper/60 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-live animate-pulse-dot" />
                {t.headers.trendingNow}
              </h2>
            </div>
            <TrendingStrip />
          </div>

          <ContentFeed />
        </>
      )}

      {activeSection === "trending" && (
        <>
          <SectionHeading
            title={t.headers.trendingNow}
            description={t.headers.trendingDesc}
            badge="Surging"
          />
          <div className="space-y-8">
            <TrendingStrip />
            <div>
              <h3 className="font-display text-base font-bold text-ink dark:text-paper mb-4">
                Full Trending Velocity Board
              </h3>
              <ContentFeed />
            </div>
          </div>
        </>
      )}

      {activeSection === "favorites" && (
        <>
          <SectionHeading
            title={t.headers.favorites}
            description={t.headers.favoritesDesc}
            badge="Offline Stored"
          />
          <FavoritesSection />
        </>
      )}

      {activeSection === "analytics" && (
        <>
          <SectionHeading
            title={t.headers.analytics}
            description={t.headers.analyticsDesc}
            badge="Insights"
          />
          <AnalyticsSection />
        </>
      )}

      {activeSection === "settings" && (
        <>
          <SectionHeading
            title={t.headers.settings}
            description={t.headers.settingsDesc}
            badge="Customization"
          />
          <PreferencesPanel />
        </>
      )}
    </DashboardShell>
  );
}
