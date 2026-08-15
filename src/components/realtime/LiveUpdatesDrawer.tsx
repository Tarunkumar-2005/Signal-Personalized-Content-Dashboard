"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setNotificationsDrawerOpen, openReaderModal } from "@/store/slices/uiSlice";
import {
  markAllNotificationsRead,
  markNotificationRead,
  toggleStreamActive,
} from "@/store/slices/realtimeSlice";
import { TRANSLATIONS } from "@/lib/i18n";
import type { RealtimeNotification } from "@/types";

export function LiveUpdatesDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.notificationsDrawerOpen);
  const { notifications, isStreamActive } = useAppSelector((state) => state.realtime);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handleOpenNotificationItem = (notif: RealtimeNotification) => {
    dispatch(markNotificationRead(notif.id));
    if (notif.item) {
      dispatch(openReaderModal(notif.item));
      dispatch(setNotificationsDrawerOpen(false));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setNotificationsDrawerOpen(false))}
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-ink-line/15 bg-white shadow-2xl dark:border-paper/15 dark:bg-ink-soft"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink-line/10 p-5 dark:border-paper/10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-live animate-pulse-dot" />
                <h3 className="font-display text-base font-bold text-ink dark:text-paper">
                  {t.realtime.liveUpdates}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setNotificationsDrawerOpen(false))}
                className="rounded-full p-1.5 text-ink/50 hover:bg-paper dark:text-paper/50 dark:hover:bg-ink"
              >
                ✕
              </button>
            </div>

            {/* Stream Control & Mark All Read */}
            <div className="flex items-center justify-between border-b border-ink-line/10 bg-paper/50 px-5 py-2.5 dark:border-paper/10 dark:bg-ink/50 text-xs">
              <button
                type="button"
                onClick={() => dispatch(toggleStreamActive())}
                className="flex items-center gap-1.5 font-medium text-ink/75 hover:text-ink dark:text-paper/75 dark:hover:text-paper"
              >
                <span>{isStreamActive ? "🟢 Stream: Active" : "⏸ Stream: Paused"}</span>
              </button>

              <button
                type="button"
                onClick={() => dispatch(markAllNotificationsRead())}
                className="text-[11px] font-semibold text-teal hover:underline"
              >
                {t.realtime.markAllRead}
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {notifications.length === 0 ? (
                <p className="py-12 text-center text-xs text-ink/40 dark:text-paper/40">
                  {t.realtime.noNotifications}
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleOpenNotificationItem(n)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all hover:scale-[1.01] ${
                      !n.read
                        ? "border-signal/50 bg-signal/5 shadow-xs dark:bg-signal/10"
                        : "border-ink-line/10 bg-paper/30 opacity-75 dark:border-paper/10 dark:bg-ink/30"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold uppercase text-signal">
                        {n.type.replace("_", " ")}
                      </span>
                      <span className="text-ink/40 dark:text-paper/40">
                        {new Date(n.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <h5 className="mt-1 font-display text-xs font-bold text-ink dark:text-paper">
                      {n.title}
                    </h5>
                    <p className="mt-0.5 text-xs text-ink/70 dark:text-paper/70">
                      {n.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
