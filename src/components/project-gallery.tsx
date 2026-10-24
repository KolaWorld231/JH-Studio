"use client";

import { useEffect, useRef, useState } from "react";
import { AppImage } from "@/components/app-image";
import { GalleryImageReveal } from "@/components/drawing/gallery-image-reveal";
import { Reveal } from "@/components/reveal";
import type { ProjectImage } from "@/lib/content/projects";

/**
 * A project's drawings/imagery grid, with a keyboard- and touch-accessible
 * lightbox for examining any image at full size — per
 * docs/PREMIUM_VISUAL_DIRECTION.md §9 ("Gallery viewing should support
 * keyboard, touch, captions, and closing"). GalleryImageReveal still
 * supplies the scroll-in wipe on the grid thumbnails; this component adds
 * the click-to-enlarge layer on top of it.
 */
export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function close() {
    const i = openIndex;
    setOpenIndex(null);
    if (i !== null) triggerRefs.current[i]?.focus();
  }

  function step(delta: number) {
    setOpenIndex((i) => (i === null ? i : (i + delta + images.length) % images.length));
  }

  useEffect(() => {
    if (openIndex === null) return;
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key === "ArrowRight") {
        step(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        step(-1);
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  const active = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, i) => (
          <Reveal key={image.src} delayMs={i * 60}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="block w-full text-left"
              aria-label={`View larger: ${image.alt}`}
            >
              <GalleryImageReveal src={image.src} alt={image.alt} sizes="(min-width: 768px) 50vw, 100vw" />
            </button>
            {image.caption ? <p className="mt-2 text-sm text-[var(--color-muted)]">{image.caption}</p> : null}
          </Reveal>
        ))}
      </div>

      {active ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex flex-col bg-[var(--color-night)]/95 p-4 md:p-10"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between text-[var(--color-night-ink)]">
            <span className="text-sm text-[var(--color-night-muted)]">
              {(openIndex ?? 0) + 1} / {images.length}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="text-sm uppercase tracking-[0.08em] hover:text-[var(--color-gold)]"
            >
              Close ✕
            </button>
          </div>

          <div className="relative mt-4 flex-1">
            <AppImage src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain" />
          </div>

          {active.caption ? (
            <p className="mt-4 text-center text-sm text-[var(--color-night-muted)]">{active.caption}</p>
          ) : null}

          {images.length > 1 ? (
            <div className="mt-4 flex justify-center gap-6">
              <button
                type="button"
                onClick={() => step(-1)}
                className="text-sm uppercase tracking-[0.08em] text-[var(--color-night-ink)] hover:text-[var(--color-gold)]"
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="text-sm uppercase tracking-[0.08em] text-[var(--color-night-ink)] hover:text-[var(--color-gold)]"
              >
                Next →
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
