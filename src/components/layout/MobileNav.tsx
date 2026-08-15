"use client";

import type { DashboardSection } from "@/store/slices/uiSlice";
import { setActiveSection } from "@/store/slices/uiSlice";
import { setSearchQuery } from "@/store/slices/contentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TRANSLATIONS } from "@/lib/i18n";

export function MobileNav() {
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const dispatch = useAppDispatch();

  const navItems: { id: DashboardSection; label: string; icon: string }[] = [
    { id: "feed", label: t.nav.feed, icon: "◧" },
    { id: "trending", label: t.nav.trending, icon: "△" },
    { id: "favorites", label: t.nav.favorites, icon: "♥" },
    { id: "analytics", label: t.nav.analytics, icon: "📊" },
    { id: "settings", label: t.nav.settings, icon: "⚙" },
  ];

  const handleNavClick = (section: DashboardSection) => {
    dispatch(setSearchQuery(""));
    dispatch(setActiveSection(section));
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-ink-line/10 bg-white/95 px-2 py-2 backdrop-blur-md dark:border-paper/10 dark:bg-ink-soft/95 md:hidden"
    >
      {navItems.map((item) => {
        const active = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavClick(item.id)}
            className={`relative flex flex-col items-center justify-center rounded-xl p-1 text-[10px] font-semibold transition-colors ${
              active
                ? "text-signal font-bold"
                : "text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper"
            }`}
          >
            <span className="text-base leading-none mb-0.5">{item.icon}</span>
            <span>{item.label}</span>
            {item.id === "favorites" && favoritesCount > 0 && (
              <span className="absolute -top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-signal font-mono text-[8px] font-bold text-ink">
                {favoritesCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
