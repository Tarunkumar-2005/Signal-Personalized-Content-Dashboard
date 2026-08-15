"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearToast } from "@/store/slices/realtimeSlice";

export function ToastContainer() {
  const toastMessage = useAppSelector((state) => state.realtime.toastMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none flex flex-col gap-2">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center gap-3 rounded-xl border border-signal/40 bg-ink px-4 py-3 text-sm text-paper shadow-2xl dark:border-signal/50 dark:bg-ink-soft"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal text-xs font-bold text-ink">
              ✓
            </span>
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => dispatch(clearToast())}
              className="ml-2 text-paper/50 hover:text-paper"
              aria-label="Dismiss toast"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
