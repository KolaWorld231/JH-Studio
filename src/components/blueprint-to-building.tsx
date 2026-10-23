"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReveal, usePrefersReducedMotion } from "@/lib/hooks/use-reveal";
import type { ProjectImage } from "@/lib/content/projects";

type Mode = "drawing" | "rendering";

/**
 * The "blueprint-to-building" sequence (docs/PREMIUM_VISUAL_DIRECTION.md §5):
 * reveal the plan/elevation, hold it long enough to read, then crossfade to
 * the matching rendering or photograph — with a manual Drawing/Visualisation
 * toggle so the transition is never the only way to see either image.
 *
 * Only rendered when a project supplies an explicit, verified
 * `blueprintToBuilding` pair (see src/lib/content/projects.ts) — this
 * component never guesses a pairing itself.
 */
export function BlueprintToBuilding({
  drawing,
  rendering,
}: {
  drawing: ProjectImage;
  rendering: ProjectImage;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>(0.35);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [autoMode, setAutoMode] = useState<Mode>("drawing");
  const [userMode, setUserMode] = useState<Mode | null>(null);

  useEffect(() => {
    if (!isVisible || userMode || prefersReducedMotion) return;
    const settle = setTimeout(() => setAutoMode("rendering"), 1400);
    return () => clearTimeout(settle);
  }, [isVisible, userMode, prefersReducedMotion]);

  // Derived every render (not frozen at mount) so it still lands correctly
  // once prefersReducedMotion resolves to its real client value after
  // hydration — useSyncExternalStore reports `false` during the hydration
  // render itself to avoid a mismatch, then updates right after.
  const mode: Mode = userMode ?? (prefersReducedMotion ? "rendering" : autoMode);
  const activeImage = mode === "drawing" ? drawing : rendering;

  function select(next: Mode) {
    setUserMode(next);
  }

  return (
    <div ref={ref}>
      <div className="relative aspect-[16/10] w-full bg-[var(--color-surface)] overflow-hidden">
        <Image
          src={drawing.src}
          alt={drawing.alt}
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover transition-opacity duration-[1200ms] ease-[var(--ease-architectural)]"
          style={{ opacity: mode === "drawing" ? 1 : 0 }}
          priority
        />
        <Image
          src={rendering.src}
          alt={rendering.alt}
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover transition-opacity duration-[1200ms] ease-[var(--ease-architectural)]"
          style={{ opacity: mode === "rendering" ? 1 : 0 }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        {activeImage.caption ? (
          <p className="text-sm text-[var(--color-muted)]">{activeImage.caption}</p>
        ) : (
          <span />
        )}
        <div role="group" aria-label="View as" className="flex gap-2">
          <button
            type="button"
            aria-pressed={mode === "drawing"}
            onClick={() => select("drawing")}
            className={`px-3 py-1.5 text-xs uppercase tracking-[0.08em] border transition-colors ${
              mode === "drawing"
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
            }`}
          >
            Drawing
          </button>
          <button
            type="button"
            aria-pressed={mode === "rendering"}
            onClick={() => select("rendering")}
            className={`px-3 py-1.5 text-xs uppercase tracking-[0.08em] border transition-colors ${
              mode === "rendering"
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
            }`}
          >
            Visualisation
          </button>
        </div>
      </div>
    </div>
  );
}
