export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block animate-pulse bg-[var(--color-border)]/60 rounded-[1px] ${className}`}
      aria-hidden="true"
    />
  );
}
