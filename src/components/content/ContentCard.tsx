"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { openReaderModal } from "@/store/slices/uiSlice";
import { setToastMessage } from "@/store/slices/realtimeSlice";
import { recordArticleRead } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TRANSLATIONS } from "@/lib/i18n";
import type { ContentItem } from "@/types";

interface ContentCardProps {
  item: ContentItem;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
  compact?: boolean;
}

export function ContentCard({ item, dragHandleProps, compact = false }: ContentCardProps) {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((favorite) => favorite.id === item.id)
  );

  const handleOpenReader = () => {
    dispatch(recordArticleRead(item.id));
    dispatch(openReaderModal(item));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      dispatch(setToastMessage(t.actions.copied));
    } else {
      dispatch(setToastMessage(t.actions.copied));
    }
  };

  const sourceBadgeColor = {
    news: "bg-teal text-paper",
    recommendation: "bg-signal text-ink font-semibold",
    social: "bg-sky-600 text-white",
  }[item.source];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-ink-line/12 bg-white shadow-card transition-shadow hover:shadow-lg dark:border-paper/10 dark:bg-ink-soft ${
        compact ? "p-3" : ""
      }`}
    >
      {/* Media Header */}
      <div
        className={`relative w-full cursor-pointer overflow-hidden ${compact ? "h-32 rounded-xl" : "h-44"}`}
        onClick={handleOpenReader}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-black/20" />

        {/* Source Badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider shadow-sm ${sourceBadgeColor}`}
        >
          {t.sources[item.source]}
        </span>

        {/* Media type / Rating Pill for recommendations */}
        {item.source === "recommendation" && item.rating && (
          <span className="absolute right-12 top-3 flex items-center gap-1 rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[10px] font-bold text-signal backdrop-blur">
            ★ {item.rating.toFixed(1)}
          </span>
        )}

        {/* Drag Handle */}
        {dragHandleProps && (
          <button
            type="button"
            aria-label="Drag to reorder"
            className="absolute right-3 top-3 flex h-7 w-7 cursor-grab items-center justify-center rounded-full bg-ink/75 text-paper shadow backdrop-blur transition-transform hover:scale-110 active:cursor-grabbing"
            {...dragHandleProps}
            onClick={(e) => e.stopPropagation()}
          >
            ⠿
          </button>
        )}

        {/* Category & Read Time overlay at bottom of image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-paper/90">
          <span className="rounded bg-black/40 px-1.5 py-0.5 font-mono uppercase tracking-wider backdrop-blur">
            {t.categories[item.category]}
          </span>
          {item.readTimeMinutes && (
            <span className="rounded bg-black/40 px-1.5 py-0.5 font-mono backdrop-blur">
              {item.source === "recommendation"
                ? `${item.readTimeMinutes} min`
                : `${item.readTimeMinutes} min read`}
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Author / Source attribution */}
        <div className="flex items-center gap-2">
          {item.authorAvatar && (
            <div className="relative h-5 w-5 overflow-hidden rounded-full">
              <Image src={item.authorAvatar} alt="" fill className="object-cover" />
            </div>
          )}
          <span className="truncate text-xs font-medium text-ink/75 dark:text-paper/75">
            {item.author}
          </span>
          {item.authorHandle && (
            <span className="truncate text-[11px] text-ink/40 dark:text-paper/40">
              {item.authorHandle}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={handleOpenReader}
          className="cursor-pointer font-display text-base font-semibold leading-snug text-ink transition-colors hover:text-signal dark:text-paper dark:hover:text-signal line-clamp-2"
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-ink/65 dark:text-paper/65 line-clamp-2">
          {item.description}
        </p>

        {/* Social Metrics */}
        {item.source === "social" && item.socialMetrics && (
          <div className="mt-1 flex items-center gap-4 text-[11px] text-ink/50 dark:text-paper/50">
            <span className="flex items-center gap-1">
              💬 {item.socialMetrics.replies}
            </span>
            <span className="flex items-center gap-1">
              🔄 {item.socialMetrics.reposts}
            </span>
            <span className="flex items-center gap-1">
              ❤️ {item.socialMetrics.likes}
            </span>
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-paper-dim/80 px-1.5 py-0.5 font-mono text-[10px] text-ink/60 dark:bg-ink/60 dark:text-paper/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-ink-line/10 dark:border-paper/10">
          <button
            type="button"
            onClick={handleOpenReader}
            className="flex items-center gap-1.5 rounded-full bg-signal px-3.5 py-1.5 text-xs font-semibold text-ink shadow-sm transition-transform hover:scale-105 active:scale-95"
          >
            {item.source === "recommendation" ? "▶ " : ""}
            {item.ctaLabel}
          </button>

          <div className="flex items-center gap-2">
            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              aria-label={t.actions.share}
              className="rounded-full p-1.5 text-ink/40 hover:bg-paper hover:text-ink dark:text-paper/40 dark:hover:bg-ink dark:hover:text-paper transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>

            {/* Favorite Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleFavorite(item));
                dispatch(
                  setToastMessage(
                    isFavorite
                      ? t.actions.removeFromFavorites
                      : t.actions.addToFavorites
                  )
                );
              }}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? t.actions.removeFromFavorites : t.actions.addToFavorites}
              className={`text-lg transition-transform hover:scale-125 ${
                isFavorite ? "text-live" : "text-ink/30 hover:text-ink/60 dark:text-paper/30 dark:hover:text-paper/60"
              }`}
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
