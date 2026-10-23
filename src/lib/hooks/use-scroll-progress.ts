"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-reveal";

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20); // 0, 0.05, ... 1

/**
 * Tracks how much of an element is in view (0–1) using IntersectionObserver
 * with a fine-grained threshold list — no scroll listener, so this stays
 * cheap even on long pages. Used to drive continuously scroll-reactive
 * drawings (lines extend further as more of the section is visible, and
 * gently recede if the visitor scrolls back out) rather than a one-shot
 * reveal. Reduced-motion users get a fixed progress of 1 (fully resolved,
 * no motion).
 */
export function useScrollProgress<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setProgress(entry.isIntersecting ? entry.intersectionRatio : 0);
      },
      { threshold: THRESHOLDS },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Reaching the trigger threshold counts as "resolved" for our purposes —
  // scenes don't need 100% of their box in view to finish drawing.
  const resolved = Math.min(1, progress / threshold);

  return { ref, progress: prefersReducedMotion ? 1 : resolved };
}
