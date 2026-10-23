"use client";

import { useState } from "react";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { useReveal } from "@/lib/hooks/use-reveal";
import type { Principle } from "@/lib/content/principles";
import type { DrawingScene } from "@/lib/drawing/types";

export function PrincipleRow({
  principle,
  scene,
  delayMs = 0,
}: {
  principle: Principle;
  scene: DrawingScene;
  delayMs?: number;
}) {
  const { ref, isVisible } = useReveal<HTMLLIElement>(0.15);
  const [emphasized, setEmphasized] = useState(false);

  return (
    <li
      ref={ref}
      id={principle.id}
      className={`fade-rise ${isVisible ? "is-visible" : ""} grid grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 border-t border-[var(--color-border)] pt-8 scroll-mt-28`}
      style={{ transitionDelay: `${delayMs}ms` }}
      onMouseEnter={() => setEmphasized(true)}
      onMouseLeave={() => setEmphasized(false)}
    >
      <button
        type="button"
        aria-pressed={emphasized}
        onClick={() => setEmphasized((e) => !e)}
        onFocus={() => setEmphasized(true)}
        onBlur={() => setEmphasized(false)}
        className="font-display text-4xl md:text-5xl text-[var(--color-gold)] leading-none text-left self-start"
      >
        {principle.index}
        <span className="sr-only"> — highlight the {principle.title} diagram</span>
      </button>
      <div>
        <h2 className="font-display text-2xl md:text-3xl text-[var(--color-ink)] transition-colors">
          {principle.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-ink-soft)]">
          {principle.description}
        </p>
      </div>
      <div
        className={`hidden lg:block w-36 h-28 shrink-0 transition-opacity duration-500 ${
          emphasized ? "opacity-100" : "opacity-40"
        }`}
      >
        <ArchitecturalDrawing scene={scene} highlighted={emphasized} showGrid={false} durationMs={900} />
      </div>
    </li>
  );
}
