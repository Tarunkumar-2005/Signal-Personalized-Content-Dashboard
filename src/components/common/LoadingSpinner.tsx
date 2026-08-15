export function LoadingSpinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-sm text-ink/50 dark:text-paper/50" role="status" aria-live="polite">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      {label}
    </div>
  );
}
