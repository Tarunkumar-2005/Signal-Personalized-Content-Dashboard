interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-line/30 px-6 py-16 text-center dark:border-paper/15">
      <p className="font-display text-lg text-ink dark:text-paper">{title}</p>
      <p className="max-w-sm text-sm text-ink/60 dark:text-paper/60">{description}</p>
      {action}
    </div>
  );
}
