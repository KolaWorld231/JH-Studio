export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center">
      <p className="font-display text-xl text-[var(--color-ink)]">{title}</p>
      <p className="mt-3 max-w-md mx-auto text-sm leading-relaxed text-[var(--color-muted)]">
        {description}
      </p>
    </div>
  );
}
