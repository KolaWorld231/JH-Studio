"use client";

import { useState } from "react";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reveal";
import { principleScenes } from "@/lib/drawing/scenes";
import { philosophySectionScenes } from "@/lib/drawing/philosophy-scenes";
import type { Principle } from "@/lib/content/principles";

/**
 * One persistent architectural model that reorganizes per selected
 * principle, rather than five unrelated illustrations — the plan, its
 * section companion, and the explanation text all stay in sync off one
 * `selectedId`. Selection is real `aria-pressed` buttons (keyboard- and
 * touch-operable, not hover-only).
 *
 * Under prefers-reduced-motion, renders the full narrative as a static
 * grid — every principle's resolved plan/section pair and caption shown at
 * once — rather than "the same model with less motion," per the
 * established reduced-motion equivalence standard in this codebase.
 */
export function PhilosophyModel({ principles }: { principles: Principle[] }) {
  const [selectedId, setSelectedId] = useState(principles[0]?.id);
  const prefersReducedMotion = usePrefersReducedMotion();
  const selected = principles.find((p) => p.id === selectedId) ?? principles[0];

  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {principles.map((principle) => (
          <div key={principle.id} id={principle.id} className="scroll-mt-28">
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square bg-[var(--color-surface)]">
                <ArchitecturalDrawing scene={principleScenes[principle.id]} mode="reveal" showGrid={false} />
              </div>
              <div className="aspect-square bg-[var(--color-surface)]">
                <ArchitecturalDrawing
                  scene={philosophySectionScenes[principle.id]}
                  mode="reveal"
                  showGrid={false}
                />
              </div>
            </div>
            <h3 className="mt-4 font-display text-xl text-[var(--color-ink)]">
              {principle.index} — {principle.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{principle.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div role="group" aria-label="Select a principle" className="flex flex-wrap gap-2">
        {principles.map((principle) => (
          <button
            key={principle.id}
            type="button"
            aria-pressed={principle.id === selected.id}
            onClick={() => setSelectedId(principle.id)}
            className={`px-4 py-2 text-sm transition-colors ${
              principle.id === selected.id
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
            }`}
          >
            {principle.index} {principle.title}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.1fr] gap-8 items-center">
        <div className="aspect-square bg-[var(--color-surface)]" aria-hidden="true">
          <ArchitecturalDrawing
            key={`${selected.id}-plan`}
            scene={principleScenes[selected.id]}
            mode="reveal"
            showGrid={false}
            durationMs={700}
          />
        </div>
        <div className="aspect-square bg-[var(--color-surface)]" aria-hidden="true">
          <ArchitecturalDrawing
            key={`${selected.id}-section`}
            scene={philosophySectionScenes[selected.id]}
            mode="reveal"
            showGrid={false}
            durationMs={700}
          />
        </div>
        <div>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--color-ink)]">
            {selected.index} — {selected.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">{selected.description}</p>
        </div>
      </div>
    </div>
  );
}
