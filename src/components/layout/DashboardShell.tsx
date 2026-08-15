"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { ProfileModal } from "@/components/auth/ProfileModal";
import { ContentReaderModal } from "@/components/content/ContentReaderModal";
import { LiveUpdatesDrawer } from "@/components/realtime/LiveUpdatesDrawer";
import { ToastContainer } from "@/components/common/ToastContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { receiveLiveItem } from "@/store/slices/contentSlice";
import { addNotification } from "@/store/slices/realtimeSlice";
import { fetchNextLiveItem } from "@/lib/mockApi";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const autoRefresh = useAppSelector((state) => state.preferences.autoRefresh);
  const isStreamActive = useAppSelector((state) => state.realtime.isStreamActive);
  const categories = useAppSelector((state) => state.preferences.categories);
  const sources = useAppSelector((state) => state.preferences.sources);

  // Background live WebSocket/SSE simulation ticker
  useEffect(() => {
    if (!autoRefresh || !isStreamActive) return;

    const interval = setInterval(() => {
      const newItem = fetchNextLiveItem(categories, sources);
      dispatch(receiveLiveItem(newItem));
      dispatch(
        addNotification({
          type: newItem.source === "news" ? "breaking_news" : "trending_alert",
          title: `New in ${newItem.category.toUpperCase()}`,
          message: newItem.title,
          item: newItem,
        })
      );
    }, 28000);

    return () => clearInterval(interval);
  }, [dispatch, autoRefresh, isStreamActive, categories, sources]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper font-body antialiased transition-colors duration-200">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col pb-16 md:pb-0">
          <Header />
          <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        {/* Mobile bottom nav */}
        <MobileNav />

        {/* Global Modals & Notifications */}
        <ProfileModal />
        <ContentReaderModal />
        <LiveUpdatesDrawer />
        <ToastContainer />
      </div>
    </div>
  );
}
