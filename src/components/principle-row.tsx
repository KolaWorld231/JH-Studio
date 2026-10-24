"use client";

import { useReveal } from "@/lib/hooks/use-reveal";
import type { Principle } from "@/lib/content/principles";

/**
 * A deep-linkable textual row for one principle — kept beneath the
 * persistent PhilosophyModel (which now owns the per-principle drawing) so
 * other pages' `philosophy#<id>` anchor links keep working and the full
 * descriptive text stays available without duplicating the model's own
 * explanation panel verbatim.
 */
export function PrincipleRow({ principle, delayMs = 0 }: { principle: Principle; delayMs?: number }) {
  const { ref, isVisible } = useReveal<HTMLLIElement>(0.15);

  return (
    <li
      ref={ref}
      id={principle.id}
      className={`fade-rise ${isVisible ? "is-visible" : ""} grid grid-cols-[auto_1fr] gap-6 md:gap-10 border-t border-[var(--color-border)] pt-8 scroll-mt-28`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <span className="font-display text-4xl md:text-5xl text-[var(--color-gold)] leading-none">
        {principle.index}
      </span>
      <div>
        <h2 className="font-display text-2xl md:text-3xl text-[var(--color-ink)]">{principle.title}</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-ink-soft)]">
          {principle.description}
        </p>
      </div>
    </li>
  );
}
