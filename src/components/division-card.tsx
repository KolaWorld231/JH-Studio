"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reveal";

type ZoomState = { rect: DOMRect };

/**
 * A full-screen panel that grows from the clicked card's exact on-screen
 * rect to fill the viewport, in the destination division's own background
 * color — reading as "zooming into" the chosen path rather than a generic
 * page swap. Pure CSS transform (translate+scale), so it's GPU-cheap and
 * never touches layout.
 */
function ZoomOverlay({ rect, color, onDone }: ZoomState & { color: string; onDone: () => void }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setExpanded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const timeout = setTimeout(onDone, 620);
    return () => clearTimeout(timeout);
  }, [expanded, onDone]);

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const fromTransform = `translate(${rect.left}px, ${rect.top}px) scale(${rect.width / vw}, ${rect.height / vh})`;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        backgroundColor: color,
        // A thin gold edge (the site's one recurring accent) rides along
        // with the scale, so the panel reads as a deliberate expansion even
        // when its fill color is close to the page behind it — not just a
        // flat color swap.
        boxShadow: "inset 0 0 0 1px var(--color-gold)",
        transformOrigin: "0 0",
        transform: expanded ? "translate(0px, 0px) scale(1, 1)" : fromTransform,
        transition: "transform 620ms var(--ease-architectural)",
        willChange: "transform",
      }}
    />
  );
}

type DivisionCardProps = {
  href: string;
  /** The destination division's own background color (a CSS color/var),
   *  so the zoom reads as arriving at that page, not a generic wipe. */
  overlayColor: string;
  className?: string;
  children: ReactNode;
};

/** A division-selector card that, on click, zooms into the destination's
 *  own color before navigating — rather than a flat page swap. Falls back
 *  to a plain link transition under prefers-reduced-motion, a modified
 *  click (new tab/window), or no-JS. */
export function DivisionCard({ href, overlayColor, className = "", children }: DivisionCardProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [zoom, setZoom] = useState<ZoomState | null>(null);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (prefersReducedMotion || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    const node = linkRef.current;
    if (!node) return;
    event.preventDefault();
    setZoom({ rect: node.getBoundingClientRect() });
  }

  return (
    <>
      <Link ref={linkRef} href={href} onClick={handleClick} className={className}>
        {children}
      </Link>
      {zoom ? (
        <ZoomOverlay rect={zoom.rect} color={overlayColor} onDone={() => router.push(href)} />
      ) : null}
    </>
  );
}
