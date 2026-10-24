"use client";

import { useEffect, useRef, useState } from "react";

export type Hotspot = { x: number; y: number; label: string; body: string };

/**
 * A focusable marker positioned over a drawing/image via percentage
 * coordinates (0-100), opening an inline annotation panel on click/focus —
 * same accessibility pattern as ProjectGallery's dialog (Escape closes,
 * focus returns to the trigger) but anchored in place rather than
 * full-screen, since a hotspot explains one detail, not a whole image.
 */
export function DrawingHotspot({ hotspot }: { hotspot: Hotspot }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="absolute" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-label={hotspot.label}
        onClick={() => setOpen((o) => !o)}
        className="relative -translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-paper)] text-[10px] text-[var(--color-gold-dim)] hover:bg-[var(--color-gold)] hover:text-[var(--color-paper)] transition-colors"
      >
        +
      </button>
      {open ? (
        <div
          role="note"
          className="absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 border border-[var(--color-border)] bg-[var(--color-paper)] p-4 text-left shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.1em] text-[var(--color-gold-dim)]">{hotspot.label}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{hotspot.body}</p>
        </div>
      ) : null}
    </div>
  );
}
