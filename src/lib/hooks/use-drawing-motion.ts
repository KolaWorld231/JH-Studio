"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./use-reveal";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

type DrawingMotionOptions = {
  mode: "reveal" | "progress";
  ambient?: boolean;
};

/**
 * Drives decorative SVG drawings without React renders on scroll or animation
 * frames. Scroll is scrubbed in a single rAF; ambient motion is capped at 24
 * visual updates per second and runs only while the drawing is on screen and
 * the document is visible. Reduced-motion users receive the resolved drawing.
 */
export function useDrawingMotion<T extends HTMLElement>({
  mode,
  ambient = false,
}: DrawingMotionOptions) {
  const ref = useRef<T | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame: number | null = null;
    let inView = true;
    let lastAmbientUpdate = 0;

    const setResolvedState = () => {
      node.style.setProperty("--drawing-progress", "1");
      node.style.setProperty("--draft-x", "0px");
      node.style.setProperty("--draft-y", "0px");
      node.style.setProperty("--draft-dash", "0");
    };

    if (prefersReducedMotion) {
      setResolvedState();
      return;
    }

    const render = (time: number) => {
      frame = null;

      if (mode === "progress") {
        const rect = node.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const start = viewportHeight * 0.94;
        const end = viewportHeight * 0.3;
        const drawingTravel = Math.min(rect.height, viewportHeight) * 0.15;
        const progress = clamp01((start - rect.top) / Math.max(1, start - end + drawingTravel));
        node.style.setProperty("--drawing-progress", progress.toFixed(4));
      } else {
        node.style.setProperty("--drawing-progress", "1");
      }

      if (ambient && inView && !document.hidden && time - lastAmbientUpdate >= 1000 / 24) {
        lastAmbientUpdate = time;
        const seconds = time / 1000;
        const x = Math.sin(seconds * 0.31) * 1.8;
        const y = Math.cos(seconds * 0.23) * 1.2;
        node.style.setProperty("--draft-x", `${x.toFixed(2)}px`);
        node.style.setProperty("--draft-y", `${y.toFixed(2)}px`);
        node.style.setProperty("--draft-dash", `${((seconds * 0.75) % 24).toFixed(2)}`);
      }

      if (ambient && inView && !document.hidden) {
        frame = requestAnimationFrame(render);
      }
    };

    const requestRender = () => {
      if (frame === null && inView && !document.hidden) {
        frame = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          requestRender();
        } else if (frame !== null) {
          cancelAnimationFrame(frame);
          frame = null;
        }
      },
      { rootMargin: "12% 0px" },
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
  }, [ambient, mode, prefersReducedMotion]);

  return ref;
}
