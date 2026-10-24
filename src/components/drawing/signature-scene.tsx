"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { homepageScenes, homepageUrbanFieldScene } from "@/lib/drawing/homepage-scenes";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reveal";
import { usePageScrollProgress } from "@/lib/hooks/use-page-scroll-progress";
import type { DrawingScene } from "@/lib/drawing/types";

type Hotspot = { id: string; label: string; x: number; y: number };

// Percentage coordinates (of the scene's own box) picked from the shared
// layer geometry in homepage-scenes.ts — approximate anchor points, not a
// pixel-exact readout, since this is an ambient proximity cue, not a
// clickable annotation (compare src/components/case-study/drawing-hotspot.tsx,
// which is the precise, click-to-open equivalent used on real projects).
const HOTSPOTS: Hotspot[] = [
  { id: "footprint", label: "Footprint", x: 50, y: 54 },
  { id: "circulation", label: "Circulation", x: 50, y: 46 },
  { id: "context", label: "Site context", x: 16, y: 23 },
  { id: "thread", label: "The thread", x: 66, y: 38 },
];

const PROXIMITY_RADIUS = 20;
const MAX_ROTATE_DEG = 4;

/** Crossfade opacity for scene `index` of `total`, expressed as a static
 * CSS calc()/clamp()/min() string against --scroll-progress — no React
 * re-renders per scroll frame, matching use-drawing-motion.ts's discipline. */
function sceneOpacityExpr(index: number, total: number): string {
  if (total === 1) return "1";
  const segment = 1 / total;
  const overlap = segment * 0.4;
  const lo = index * segment;
  const hi = (index + 1) * segment;
  const fadeIn =
    index === 0
      ? "1"
      : `clamp(0, calc((var(--scroll-progress, 0) - ${(lo - overlap / 2).toFixed(4)}) / ${overlap.toFixed(4)}), 1)`;
  const fadeOut =
    index === total - 1
      ? "1"
      : `clamp(0, calc((${(hi + overlap / 2).toFixed(4)} - var(--scroll-progress, 0)) / ${overlap.toFixed(4)}), 1)`;
  return `min(${fadeIn}, ${fadeOut})`;
}

function useIsCompactViewport() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return compact;
}

/** Rotation + proximity-label tracking for one pointer, applied directly as
 * CSS custom properties on the ref'd node (no React state/re-render) —
 * desktop fine-pointer only, fully inert under prefers-reduced-motion. */
function usePointerStage<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reset = () => {
      node.style.setProperty("--rot-x", "0deg");
      node.style.setProperty("--rot-y", "0deg");
      for (const hotspot of HOTSPOTS) node.style.setProperty(`--near-${hotspot.id}`, "0");
    };

    const handleMove = (event: PointerEvent) => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const rect = node.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width;
        const relY = (event.clientY - rect.top) / rect.height;
        const rotY = (relX - 0.5) * 2 * MAX_ROTATE_DEG;
        const rotX = (0.5 - relY) * 2 * MAX_ROTATE_DEG;
        node.style.setProperty("--rot-x", `${rotY.toFixed(2)}deg`);
        node.style.setProperty("--rot-y", `${rotX.toFixed(2)}deg`);

        const px = relX * 100;
        const py = relY * 100;
        for (const hotspot of HOTSPOTS) {
          const dist = Math.hypot(px - hotspot.x, py - hotspot.y);
          const near = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
          node.style.setProperty(`--near-${hotspot.id}`, near.toFixed(3));
        }
      });
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", reset);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  return ref;
}

/**
 * The parent homepage's signature scene: the three homepage-scenes.ts
 * drawings (plan -> axonometric -> urban field) crossfade across a pinned
 * viewport as the visitor scrolls through it, construction reading through
 * each scene's own reveal-order choreography rather than path morphing.
 * Desktop pointer movement adds a very small (<=4deg) tilt and fades in a
 * few ambient proximity labels; both are inert on touch and under
 * prefers-reduced-motion, which instead renders the finished urban-field
 * scene as a plain static drawing — no pinned scroll, no rotation.
 *
 * No principle-selector UI here (decision: that control lives only on
 * Philosophy) — this scene previews the practice and links through.
 */
export function SignatureScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const compact = useIsCompactViewport();
  const progressRef = usePageScrollProgress<HTMLDivElement>();
  const stageRef = usePointerStage<HTMLDivElement>(!prefersReducedMotion);

  if (prefersReducedMotion) {
    return (
      <section className="border-b border-[var(--color-border)] py-16 md:py-24">
        <div className="container-edge grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
              The Practice
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-[var(--color-ink)]">
              A line becomes a place to live.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--color-ink-soft)]">
              Every Knitted Architecture project starts as a plan, resolves into a volume, and
              settles into the field of buildings and movement around it.
            </p>
            <Link
              href="/knitted-architecture/philosophy"
              className="mt-6 inline-flex items-center text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-gold)]"
            >
              Explore the philosophy →
            </Link>
          </div>
          <div className="relative aspect-[4/3] w-full">
            <ArchitecturalDrawing
              scene={homepageUrbanFieldScene}
              mode="reveal"
              showCaption
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    );
  }

  const scenes: DrawingScene[] = compact
    ? [homepageScenes[0], homepageScenes[2]]
    : [...homepageScenes];
  const bandCount = scenes.length;

  return (
    <div ref={progressRef} className="relative" style={{ height: `${bandCount * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden border-b border-[var(--color-border)]">
        <div className="container-edge relative grid h-full grid-cols-1 lg:grid-cols-5 gap-6 items-center py-10">
          {/* Headline column: ordinary flow content inside the already-pinned
              container, structurally separate from the scene's grid column
              below (not overlapping it) — a layout guarantee, not a mask. */}
          <div className="relative z-10 lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
              The Practice
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-[var(--color-ink)]">
              A line becomes a place to live.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--color-ink-soft)]">
              Scroll to watch one project move from plan to volume to the field of buildings and
              movement around it.
            </p>
            <Link
              href="/knitted-architecture/philosophy"
              className="mt-6 inline-flex items-center text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-gold)]"
            >
              Explore the philosophy →
            </Link>
          </div>

          <div
            ref={stageRef}
            className="relative h-full lg:col-span-3"
            style={{ "--rot-x": "0deg", "--rot-y": "0deg" } as CSSProperties}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: "perspective(1400px) rotateX(var(--rot-y)) rotateY(var(--rot-x))",
                transition: "transform 200ms ease-out",
              }}
            >
              {scenes.map((scene, i) => (
                <div
                  key={scene.id}
                  className="absolute inset-0"
                  style={{ opacity: sceneOpacityExpr(i, bandCount) }}
                >
                  <ArchitecturalDrawing
                    scene={scene}
                    mode="reveal"
                    ambient
                    showCaption
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>

            {HOTSPOTS.map((hotspot) => (
              <p
                key={hotspot.id}
                aria-hidden="true"
                className="annotation-text pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold-dim)]"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  opacity: `var(--near-${hotspot.id}, 0)`,
                }}
              >
                {hotspot.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
