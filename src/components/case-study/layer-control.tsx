"use client";

import { useState, type ReactNode } from "react";

export type Layer = { id: string; label: string; content: ReactNode };

/**
 * Generalizes BlueprintToBuilding's binary Drawing/Visualisation toggle to
 * N named layers (plan/section/elevation/model/...) — same role="group" +
 * aria-pressed button styling, so it reads as the same interaction
 * language everywhere it appears in a project's case study.
 */
export function LayerControl({ layers }: { layers: Layer[] }) {
  const [activeId, setActiveId] = useState(layers[0]?.id);
  const active = layers.find((l) => l.id === activeId) ?? layers[0];

  return (
    <div>
      <div role="group" aria-label="View layer" className="flex flex-wrap gap-2">
        {layers.map((layer) => (
          <button
            key={layer.id}
            type="button"
            aria-pressed={layer.id === active.id}
            onClick={() => setActiveId(layer.id)}
            className={`px-3 py-1.5 text-xs uppercase tracking-[0.08em] border transition-colors ${
              layer.id === active.id
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{active?.content}</div>
    </div>
  );
}
