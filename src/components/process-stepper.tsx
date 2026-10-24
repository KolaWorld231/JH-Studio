"use client";

import { useId, useState } from "react";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reveal";
import { processStages } from "@/lib/drawing/process-scenes";

/**
 * A 6-stage persistent model (Listen -> Read the site -> Connect -> Test ->
 * Resolve -> Build), replacing ProcessPrinciplePanel: the same "intro text +
 * selector + reactive drawing" role, reframed around process stages rather
 * than principles (which now live on Philosophy's own persistent model).
 *
 * Within a stage, visitors can either view plan/section side by side, or
 * drag a native range-input comparison control to wipe between the two in
 * one panel — keyboard-operable for free via standard <input type="range">
 * semantics, no custom drag implementation.
 */
export function ProcessStepper() {
  const [stageIndex, setStageIndex] = useState(0);
  const [compareValue, setCompareValue] = useState(50);
  const [viewMode, setViewMode] = useState<"side-by-side" | "compare">("side-by-side");
  const prefersReducedMotion = usePrefersReducedMotion();
  const sliderId = useId();
  const stage = processStages[stageIndex];

  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {processStages.map((s) => (
          <div key={s.id}>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square bg-[var(--color-surface)]">
                <ArchitecturalDrawing scene={s.plan} mode="reveal" showGrid={false} />
              </div>
              <div className="aspect-square bg-[var(--color-surface)]">
                <ArchitecturalDrawing scene={s.section} mode="reveal" showGrid={false} />
              </div>
            </div>
            <h3 className="mt-4 font-display text-xl text-[var(--color-ink)]">{s.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{s.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div role="group" aria-label="Select a process stage" className="flex flex-wrap gap-2">
        {processStages.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={i === stageIndex}
            onClick={() => setStageIndex(i)}
            className={`px-4 py-2 text-sm transition-colors ${
              i === stageIndex
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
            }`}
          >
            {i + 1}. {s.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setViewMode("side-by-side")}
          className={`text-xs uppercase tracking-[0.08em] ${
            viewMode === "side-by-side" ? "text-[var(--color-ink)] underline underline-offset-4" : "text-[var(--color-muted)]"
          }`}
        >
          Plan &amp; section
        </button>
        <button
          type="button"
          onClick={() => setViewMode("compare")}
          className={`text-xs uppercase tracking-[0.08em] ${
            viewMode === "compare" ? "text-[var(--color-ink)] underline underline-offset-4" : "text-[var(--color-muted)]"
          }`}
        >
          Compare
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
        {viewMode === "side-by-side" ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-square bg-[var(--color-surface)]" aria-hidden="true">
              <ArchitecturalDrawing key={`${stage.id}-plan`} scene={stage.plan} mode="reveal" showGrid={false} durationMs={700} />
            </div>
            <div className="aspect-square bg-[var(--color-surface)]" aria-hidden="true">
              <ArchitecturalDrawing key={`${stage.id}-section`} scene={stage.section} mode="reveal" showGrid={false} durationMs={700} />
            </div>
          </div>
        ) : (
          <div>
            <div className="relative aspect-square bg-[var(--color-surface)] overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0">
                <ArchitecturalDrawing key={`${stage.id}-plan-compare`} scene={stage.plan} mode="reveal" showGrid={false} durationMs={700} />
              </div>
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 0 0 ${compareValue}%)` }}
              >
                <ArchitecturalDrawing key={`${stage.id}-section-compare`} scene={stage.section} mode="reveal" showGrid={false} durationMs={700} />
              </div>
              <div
                className="absolute inset-y-0 w-px bg-[var(--color-gold)]"
                style={{ left: `${compareValue}%` }}
              />
            </div>
            <label htmlFor={sliderId} className="sr-only">
              Compare plan and section for {stage.label}
            </label>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={100}
              value={compareValue}
              onChange={(e) => setCompareValue(Number(e.target.value))}
              className="mt-4 w-full"
            />
            <div className="mt-1 flex justify-between text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
              <span>Plan</span>
              <span>Section</span>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--color-ink)]">
            {stageIndex + 1}. {stage.label}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">{stage.description}</p>
        </div>
      </div>
    </div>
  );
}
