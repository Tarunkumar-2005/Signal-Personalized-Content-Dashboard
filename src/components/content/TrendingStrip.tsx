"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { loadTrending } from "@/store/slices/contentSlice";
import { openReaderModal } from "@/store/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TRANSLATIONS } from "@/lib/i18n";
import type { ContentItem } from "@/types";

export function TrendingStrip() {
  const dispatch = useAppDispatch();
  const { trending, trendingStatus } = useAppSelector((state) => state.content);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    dispatch(loadTrending());
  }, [dispatch]);

  if (trendingStatus === "loading" && trending.length === 0) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 min-w-[260px] animate-pulse rounded-2xl border border-ink-line/10 bg-white/60 dark:border-paper/10 dark:bg-ink-soft/60"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-3">
      {trending.map((item: ContentItem, index: number) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.02, y: -2 }}
          onClick={() => dispatch(openReaderModal(item))}
          className="group relative flex min-w-[280px] max-w-[300px] cursor-pointer overflow-hidden rounded-2xl border border-ink-line/12 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md dark:border-paper/10 dark:bg-ink-soft"
        >
          <div className="flex gap-3 w-full">
            {/* Thumbnail */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink/10">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="80px"
                className="object-cover transition-transform group-hover:scale-105"
              />
              <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-signal font-mono text-[10px] font-bold text-ink shadow">
                #{index + 1}
              </span>
            </div>

            {/* Meta & Title */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-mono uppercase font-semibold text-teal dark:text-teal">
                    {t.categories[item.category]}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-live font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse-dot" />
                    +{item.trendingScore}%
                  </span>
                </div>
                <h4 className="mt-1 line-clamp-2 font-display text-xs font-semibold leading-snug text-ink dark:text-paper group-hover:text-signal transition-colors">
                  {item.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-[10px] text-ink/50 dark:text-paper/50 pt-1">
                <span>{item.author}</span>
                <span>{t.sources[item.source]}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
