"use client";

export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink-line/10 bg-white/70 shadow-card animate-pulse dark:border-paper/10 dark:bg-ink-soft/70">
      <div className="h-44 w-full bg-ink/10 dark:bg-paper/10" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 rounded-full bg-ink/10 dark:bg-paper/10" />
          <div className="h-4 w-12 rounded-full bg-ink/10 dark:bg-paper/10" />
        </div>
        <div className="h-5 w-4/5 rounded bg-ink/10 dark:bg-paper/10" />
        <div className="h-4 w-full rounded bg-ink/10 dark:bg-paper/10" />
        <div className="h-4 w-2/3 rounded bg-ink/10 dark:bg-paper/10" />
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="h-8 w-24 rounded-full bg-ink/10 dark:bg-paper/10" />
          <div className="h-6 w-6 rounded-full bg-ink/10 dark:bg-paper/10" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
