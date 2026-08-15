"use client";

import Image from "next/image";
import { DarkModeToggle } from "@/components/common/DarkModeToggle";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { SearchBar } from "@/components/search/SearchBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setNotificationsDrawerOpen,
  setProfileModalOpen,
  toggleMobileMenu,
} from "@/store/slices/uiSlice";

export function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const notifications = useAppSelector((state) => state.realtime.notifications);
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-ink-line/10 bg-paper/80 px-4 py-3.5 backdrop-blur-md dark:border-paper/10 dark:bg-ink/80 sm:px-6">
      {/* Mobile Menu Toggle + Search Bar */}
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleMobileMenu())}
          aria-label="Toggle navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink-line/15 bg-white text-ink shadow-xs dark:border-paper/15 dark:bg-ink-soft dark:text-paper md:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <SearchBar />
      </div>

      {/* Right Controls: Notifications, Language, Dark Mode, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Live Notification Bell */}
        <button
          type="button"
          onClick={() => dispatch(setNotificationsDrawerOpen(true))}
          aria-label="Open live alerts"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink-line/15 bg-paper text-ink transition-transform hover:scale-105 active:scale-95 dark:border-paper/15 dark:bg-ink-soft dark:text-paper"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {unreadNotifsCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-live font-mono text-[9px] font-bold text-white shadow-xs animate-bounce">
              {unreadNotifsCount}
            </span>
          )}
        </button>

        <LanguageSelector />
        <DarkModeToggle />

        {/* User Profile Avatar / Account Button */}
        <button
          type="button"
          onClick={() => dispatch(setProfileModalOpen(true))}
          aria-label="Open profile settings"
          className="flex items-center gap-2 rounded-full border border-ink-line/15 bg-paper p-1 pr-2.5 text-xs text-ink transition-transform hover:scale-102 dark:border-paper/15 dark:bg-ink-soft dark:text-paper"
        >
          <div className="relative h-7 w-7 overflow-hidden rounded-full border border-signal">
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
          </div>
          <span className="hidden font-medium sm:inline">{user.name}</span>
        </button>
      </div>
    </header>
  );
}
