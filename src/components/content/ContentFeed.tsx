"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { EmptyState } from "@/components/common/EmptyState";
import { SkeletonGrid } from "@/components/common/SkeletonCard";
import { SortableCard } from "@/components/content/SortableCard";
import { FeedToolbar } from "@/components/content/FeedToolbar";
import { loadFeedPage, reorderFeed } from "@/store/slices/contentSlice";
import { resetPreferences } from "@/store/slices/preferencesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TRANSLATIONS } from "@/lib/i18n";
import type { ContentItem } from "@/types";

export function ContentFeed() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const {
    feed,
    feedStatus,
    feedError,
    hasMore,
    feedPage,
    selectedSourceFilter,
    sortBy,
  } = useAppSelector((state) => state.content);

  const categories = useAppSelector((state) => state.preferences.categories);
  const sources = useAppSelector((state) => state.preferences.sources);
  const viewMode = useAppSelector((state) => state.preferences.viewMode);
  const paginationMode = useAppSelector((state) => state.preferences.paginationMode);

  const [activePageIndex, setActivePageIndex] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const categoriesKey = categories.join(",");
  const sourcesKey = sources.join(",");

  // Reload feed whenever preferences change
  useEffect(() => {
    dispatch(loadFeedPage({ reset: true }));
  }, [dispatch, categoriesKey, sourcesKey]);

  // Infinite scroll observer
  useEffect(() => {
    if (paginationMode !== "infinite") return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && feedStatus !== "loading") {
          dispatch(loadFeedPage());
        }
      },
      { rootMargin: "250px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [dispatch, hasMore, feedStatus, paginationMode]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      dispatch(reorderFeed({ fromId: String(active.id), toId: String(over.id) }));
    },
    [dispatch]
  );

  // Filter & Sort displayed items
  const displayedItems = useMemo(() => {
    let result = [...feed];

    // Source filtering
    if (selectedSourceFilter !== "all") {
      result = result.filter((item) => item.source === selectedSourceFilter);
    }

    // Sorting
    switch (sortBy) {
      case "trending":
        result.sort((a, b) => b.trendingScore - a.trendingScore);
        break;
      case "topRated":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "mostDiscussed":
        result.sort(
          (a, b) => (b.socialMetrics?.replies || 0) - (a.socialMetrics?.replies || 0)
        );
        break;
      case "newest":
      default:
        // Keep order or sort by date
        break;
    }

    // If in paged mode, slice by page
    if (paginationMode === "paged") {
      const pageSize = 9;
      const start = (activePageIndex - 1) * pageSize;
      return result.slice(start, start + pageSize);
    }

    return result;
  }, [feed, selectedSourceFilter, sortBy, paginationMode, activePageIndex]);

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <EmptyState
          title="No categories selected"
          description="Open preferences and choose at least one category to curate your personalized feed."
        />
        <button
          type="button"
          onClick={() => dispatch(resetPreferences())}
          className="mt-4 rounded-full bg-signal px-5 py-2 text-xs font-bold text-ink hover:bg-signal-dim shadow transition-colors"
        >
          {t.settings.resetAll}
        </button>
      </div>
    );
  }

  if (feedStatus === "failed") {
    return (
      <div className="flex flex-col items-center">
        <EmptyState
          title="Failed to load your feed"
          description={feedError ?? "Could not connect to data providers. Try reloading."}
        />
        <button
          type="button"
          onClick={() => dispatch(loadFeedPage({ reset: true }))}
          className="mt-4 rounded-full bg-signal px-5 py-2 text-xs font-bold text-ink hover:bg-signal-dim transition-colors"
        >
          {t.actions.refresh}
        </button>
      </div>
    );
  }

  const gridClass = {
    grid: "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3",
    compact: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    list: "flex flex-col gap-4 max-w-4xl mx-auto",
  }[viewMode];

  const totalPagedCount = Math.max(1, Math.ceil(feed.length / 9));

  return (
    <div>
      <FeedToolbar />

      {feedStatus === "idle" || (feedStatus === "loading" && feed.length === 0) ? (
        <SkeletonGrid count={6} />
      ) : displayedItems.length === 0 ? (
        <EmptyState
          title="No items found"
          description="No content matches your selected filters. Try choosing a different source or adjusting preferences."
        />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={displayedItems.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <div className={gridClass}>
              {displayedItems.map((item: ContentItem) => (
                <SortableCard
                  key={item.id}
                  item={item}
                  compact={viewMode === "compact"}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Infinite Scroll sentinel */}
      {paginationMode === "infinite" && (
        <>
          <div ref={sentinelRef} className="h-10 w-full" />
          {feedStatus === "loading" && feed.length > 0 && (
            <div className="py-6">
              <SkeletonGrid count={3} />
            </div>
          )}
          {!hasMore && feed.length > 0 && (
            <p className="py-8 text-center text-xs text-ink/40 dark:text-paper/40 font-mono">
              ✦ {t.actions.loadMore}: You are all caught up for now ✦
            </p>
          )}
        </>
      )}

      {/* Paged Mode Pagination Controls */}
      {paginationMode === "paged" && feed.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={activePageIndex <= 1}
            onClick={() => setActivePageIndex((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-ink-line/15 px-3 py-1.5 text-xs font-semibold text-ink disabled:opacity-30 dark:border-paper/15 dark:text-paper hover:bg-paper dark:hover:bg-ink"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPagedCount }).map((_, i) => {
            const pageNum = i + 1;
            const active = pageNum === activePageIndex;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setActivePageIndex(pageNum)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-mono font-bold transition-colors ${
                  active
                    ? "bg-signal text-ink shadow-sm"
                    : "border border-ink-line/15 text-ink hover:bg-paper dark:border-paper/15 dark:text-paper dark:hover:bg-ink"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            disabled={activePageIndex >= totalPagedCount}
            onClick={() => setActivePageIndex((p) => Math.min(totalPagedCount, p + 1))}
            className="rounded-lg border border-ink-line/15 px-3 py-1.5 text-xs font-semibold text-ink disabled:opacity-30 dark:border-paper/15 dark:text-paper hover:bg-paper dark:hover:bg-ink"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
