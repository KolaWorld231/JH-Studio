"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-reveal";

/**
 * Bounded, rAF-throttled pointer offset for a container, used to give a
 * single drawing layer a very small sense of depth on desktop. Disabled
 * entirely under prefers-reduced-motion and on devices without a fine
 * pointer (touch), so it never becomes a required interaction. Returns
 * {x, y} already clamped to [-maxOffset, maxOffset].
 */
export function usePointerParallax<T extends HTMLElement>(maxOffset = 6) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;
    if (typeof window === "undefined") return;

    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsFinePointer) return;

    function handleMove(event: PointerEvent) {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;
        setOffset({
          x: Math.max(-maxOffset, Math.min(maxOffset, relX * maxOffset * 2)),
          y: Math.max(-maxOffset, Math.min(maxOffset, relY * maxOffset * 2)),
        });
      });
    }

    function handleLeave() {
      setOffset({ x: 0, y: 0 });
    }

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [maxOffset, prefersReducedMotion]);

  return { ref, offset };
}
