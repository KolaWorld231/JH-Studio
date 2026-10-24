export function Skeleton({
  className = "",
  tone = "paper",
}: {
  className?: string;
  tone?: "paper" | "night";
}) {
  const toneClass =
    tone === "night" ? "bg-[var(--color-night-border)]" : "bg-[var(--color-border)]/60";

  return (
    <span className={`block animate-pulse rounded-[1px] ${toneClass} ${className}`} aria-hidden="true" />
  );
}
