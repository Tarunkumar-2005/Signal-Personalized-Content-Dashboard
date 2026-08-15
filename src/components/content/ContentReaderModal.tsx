"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/common/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeReaderModal } from "@/store/slices/uiSlice";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { setToastMessage } from "@/store/slices/realtimeSlice";
import { TRANSLATIONS } from "@/lib/i18n";

export function ContentReaderModal() {
  const item = useAppSelector((state) => state.ui.activeReaderItem);
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const isFavorite = useAppSelector((state) =>
    item ? state.favorites.items.some((f) => f.id === item.id) : false
  );

  if (!item) return null;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      dispatch(setToastMessage(t.actions.copied));
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isMedia = item.source === "recommendation";

  return (
    <Modal
      isOpen={!!item}
      onClose={() => dispatch(closeReaderModal())}
      title={item.sourceName || t.sources[item.source]}
      maxWidth="2xl"
    >
      <div className="flex flex-col gap-5">
        {/* Cover Image / Video preview box */}
        <div className="relative h-60 w-full overflow-hidden rounded-xl bg-ink/5">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Media Play Button Overlay */}
          {isMedia && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-signal text-ink shadow-2xl transition-transform hover:scale-110 active:scale-95"
              >
                {isPlaying ? (
                  <span className="text-xl">⏸</span>
                ) : (
                  <span className="ml-1 text-2xl">▶</span>
                )}
              </button>
            </div>
          )}

          {/* Badge & Category */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
            <span className="rounded-full bg-signal px-3 py-1 font-mono font-bold uppercase tracking-wider text-ink">
              {t.categories[item.category]}
            </span>
            {item.rating && (
              <span className="rounded-full bg-ink/80 px-2.5 py-1 font-mono font-bold text-signal backdrop-blur">
                ★ {item.rating.toFixed(1)} / 10
              </span>
            )}
          </div>
        </div>

        {/* Media Player Simulation Bar */}
        {isPlaying && (
          <div className="rounded-xl border border-signal/40 bg-signal/10 p-4 dark:border-signal/30 dark:bg-signal/5 animate-pulse">
            <div className="flex items-center justify-between text-xs font-mono text-ink dark:text-paper mb-2">
              <span>Streaming preview: {item.title}</span>
              <span>01:24 / 03:45</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-paper/10">
              <div className="h-full w-2/5 rounded-full bg-signal" />
            </div>
          </div>
        )}

        {/* Author / Timestamp */}
        <div className="flex items-center justify-between border-b border-ink-line/10 pb-3 text-xs text-ink/60 dark:border-paper/10 dark:text-paper/60">
          <div className="flex items-center gap-2">
            {item.authorAvatar && (
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image src={item.authorAvatar} alt="" fill className="object-cover" />
              </div>
            )}
            <span className="font-medium text-ink dark:text-paper">{item.author}</span>
            {item.authorHandle && <span>{item.authorHandle}</span>}
          </div>
          <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl font-bold leading-tight text-ink dark:text-paper">
          {item.title}
        </h2>

        {/* Content Body */}
        <div className="space-y-4 text-sm leading-relaxed text-ink/80 dark:text-paper/80">
          <p className="font-medium text-base text-ink dark:text-paper">
            {item.description}
          </p>
          <p>{item.content || item.description}</p>
          <p>
            This story was verified from {item.sourceName || "connected news wire"} and reflects the latest developments as curated by your personal dashboard preferences.
          </p>
        </div>

        {/* Tags */}
        {item.tags && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-paper-dim px-3 py-1 font-mono text-xs text-ink/70 dark:bg-ink dark:text-paper/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-ink-line/10 pt-4 dark:border-paper/10">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full border border-ink-line/20 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-paper dark:border-paper/20 dark:text-paper dark:hover:bg-ink"
          >
            <span>{copied ? "✓ Copied!" : "↗ Share"}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                dispatch(toggleFavorite(item));
                dispatch(
                  setToastMessage(
                    isFavorite
                      ? t.actions.removeFromFavorites
                      : t.actions.addToFavorites
                  )
                );
              }}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-transform hover:scale-105 ${
                isFavorite
                  ? "bg-live text-paper"
                  : "bg-paper-dim text-ink dark:bg-ink dark:text-paper"
              }`}
            >
              <span>{isFavorite ? "♥ Saved" : "♡ Save Favorite"}</span>
            </button>
            <button
              type="button"
              onClick={() => dispatch(closeReaderModal())}
              className="rounded-full bg-signal px-5 py-2 text-xs font-bold text-ink hover:bg-signal-dim transition-colors"
            >
              {t.actions.close}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
