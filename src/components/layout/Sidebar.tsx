"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { DashboardSection } from "@/store/slices/uiSlice";
import { setActiveSection, setMobileMenuOpen } from "@/store/slices/uiSlice";
import { setSearchQuery } from "@/store/slices/contentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TRANSLATIONS } from "@/lib/i18n";

export function Sidebar() {
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const mobileMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);
  const isStreamActive = useAppSelector((state) => state.realtime.isStreamActive);
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
    dispatch(setMobileMenuOpen(false));
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex flex-col gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-live" />
          </span>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-ink dark:text-paper">
              {t.appName}
            </span>
            <p className="text-[10px] text-ink/40 dark:text-paper/40 uppercase tracking-widest font-mono">
              Content Hub
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Dashboard sections" className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-signal/20 text-ink dark:text-paper font-bold shadow-xs scale-[1.02]"
                    : "text-ink/65 hover:bg-paper dark:text-paper/65 dark:hover:bg-ink"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-sm transition-transform group-hover:scale-110" aria-hidden>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>
                {item.id === "favorites" && favoritesCount > 0 && (
                  <span className="rounded-full bg-signal px-2 py-0.5 font-mono text-[10px] font-bold text-ink">
                    {favoritesCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Stream Status Card at bottom */}
      <div className="rounded-2xl border border-ink-line/10 bg-paper/60 p-3.5 dark:border-paper/10 dark:bg-ink/60">
        <div className="flex items-center justify-between text-[11px] font-semibold text-ink dark:text-paper">
          <span>Live Data Feed</span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-teal">
            <span className={`h-1.5 w-1.5 rounded-full ${isStreamActive ? "bg-teal animate-pulse" : "bg-ink/30"}`} />
            {isStreamActive ? "ONLINE" : "PAUSED"}
          </span>
        </div>
        <p className="mt-1 text-[10px] text-ink/50 dark:text-paper/50">
          Syncing News, TMDB/Spotify, & Social streams.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-ink-line/10 bg-white dark:border-paper/10 dark:bg-ink-soft md:flex md:flex-col">
        {navContent}
      </aside>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="fixed inset-0 bg-ink/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 w-64 bg-white shadow-2xl dark:bg-ink-soft h-full"
            >
              {navContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
