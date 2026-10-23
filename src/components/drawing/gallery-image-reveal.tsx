"use client";

import Image from "next/image";
import { useReveal } from "@/lib/hooks/use-reveal";

/**
 * Wraps a real project image (plan, elevation, section, photo — whatever
 * was actually supplied) with a scroll-triggered wipe, as if it were being
 * scanned onto the page by a drafting pen, plus a thin gold sweep line at
 * the reveal edge. The motion is applied to the authentic asset itself —
 * nothing is fabricated or overlaid as if it were a drawing.
 */
export function GalleryImageReveal({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>(0.2);

  return (
    <div ref={ref} className="relative aspect-[4/3] bg-[var(--color-surface)] overflow-hidden">
      <div
        className="absolute inset-0 transition-[clip-path] duration-[1400ms] ease-[var(--ease-architectural)]"
        style={{ clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-px bg-[var(--color-gold)] transition-[left,opacity] duration-[1400ms] ease-[var(--ease-architectural)]"
        style={{ left: isVisible ? "100%" : "0%", opacity: isVisible ? 0 : 1 }}
      />
    </div>
  );
}
