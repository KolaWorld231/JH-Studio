"use client";

import Link from "next/link";
import { useReveal } from "@/lib/hooks/use-reveal";
import type { Principle } from "@/lib/content/principles";

export function PrincipleCardLink({ principle, delayMs = 0 }: { principle: Principle; delayMs?: number }) {
  const { ref, isVisible } = useReveal<HTMLAnchorElement>(0.15);

  return (
    <Link
      ref={ref}
      href={`/knitted-architecture/philosophy#${principle.id}`}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`group fade-rise ${isVisible ? "is-visible" : ""} bg-[var(--color-paper)] p-6 transition-colors hover:bg-[var(--color-surface)]`}
    >
      <span className="font-display text-2xl text-[var(--color-gold-dim)]">{principle.index}</span>
      <h3 className="mt-3 font-display text-lg text-[var(--color-ink)] group-hover:text-[var(--color-gold-dim)] transition-colors">
        {principle.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{principle.description}</p>
    </Link>
  );
}
