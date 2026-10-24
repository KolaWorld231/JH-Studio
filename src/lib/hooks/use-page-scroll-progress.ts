"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./use-reveal";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Sibling to use-drawing-motion.ts, for tracking scroll progress across an
 * entire page-length section (the KA homepage's gold thread, the signature
 * scene's three scroll bands) rather than one drawing's own bounding rect.
 * Sets `--scroll-progress` (0 at the section's top edge entering the
 * viewport, 1 at its bottom edge leaving it) directly on the ref'd node via
 * a single rAF loop — no React re-renders. IntersectionObserver-gated,
 * paused off-screen and when the tab is hidden, resolves instantly to 1
 * under prefers-reduced-motion, matching use-drawing-motion.ts's discipline
 * exactly.
 */
export function usePageScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame: number | null = null;
    let inView = true;

    const setResolvedState = () => {
      node.style.setProperty("--scroll-progress", "1");
    };

    if (prefersReducedMotion) {
      setResolvedState();
      return;
    }

    const render = () => {
      frame = null;
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height + viewportHeight;
      const progress = clamp01((viewportHeight - rect.top) / Math.max(1, total));
      node.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const requestRender = () => {
      if (frame === null && inView && !document.hidden) {
        frame = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) requestRender();
      },
      { rootMargin: "20% 0px" },
    );

    observer.observe(node);
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    document.addEventListener("visibilitychange", requestRender);
    requestRender();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      document.removeEventListener("visibilitychange", requestRender);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return ref;
}
