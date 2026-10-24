"use client";

import { useState } from "react";
import Link from "next/link";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { useReveal } from "@/lib/hooks/use-reveal";
import { principleScenes } from "@/lib/drawing/scenes";
import type { Principle } from "@/lib/content/principles";

export function PrincipleCardLink({ principle, delayMs = 0 }: { principle: Principle; delayMs?: number }) {
  const { ref, isVisible } = useReveal<HTMLAnchorElement>(0.15);
  const [hovered, setHovered] = useState(false);
  const scene = principleScenes[principle.id];

  return (
    <Link
      ref={ref}
      href={`/knitted-architecture/philosophy#${principle.id}`}
      style={{ transitionDelay: `${delayMs}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group relative overflow-hidden fade-rise ${isVisible ? "is-visible" : ""} bg-[var(--color-paper)] p-6 transition-colors hover:bg-[var(--color-surface)]`}
    >
      {scene ? (
        <div
          aria-hidden="true"
          className={`absolute -right-4 -top-2 w-24 h-20 transition-opacity duration-300 ${
            hovered ? "opacity-60" : "opacity-0"
          }`}
        >
          <ArchitecturalDrawing scene={scene} mode="reveal" highlighted={hovered} showGrid={false} durationMs={700} />
        </div>
      ) : null}
      <span className="relative font-display text-2xl text-[var(--color-gold-dim)]">
        {principle.index}
      </span>
      <h3 className="relative mt-3 font-display text-lg text-[var(--color-ink)] group-hover:text-[var(--color-gold-dim)] transition-colors">
        {principle.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
        {principle.description}
      </p>
    </Link>
  );
}
