"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/lib/hooks/use-reveal";
import { useScrollProgress } from "@/lib/hooks/use-scroll-progress";
import { usePointerParallax } from "@/lib/hooks/use-pointer-parallax";
import { ROLE_STYLE, type DrawingPath, type DrawingScene, type LayerRole } from "@/lib/drawing/types";

type ArchitecturalDrawingProps = {
  scene: DrawingScene;
  /** "reveal" = draws once when scrolled into view (cheap, default).
   *  "progress" = continuously tied to how much of the drawing is in view —
   *  lines extend further as you scroll in, and gently recede if you scroll
   *  back out. Use for a small number of showcase moments, not every scene. */
  mode?: "reveal" | "progress";
  tone?: "ink" | "paper";
  viewBox?: string;
  className?: string;
  /** Lets secondary/annotation layers drift a few px toward the pointer on
   *  desktop — disabled under reduced motion and on touch automatically. */
  interactive?: boolean;
  /** External emphasis (e.g. a hovered/focused principle row driving its
   *  own drawing) — boosts weight and accent width without re-triggering
   *  the reveal animation. */
  highlighted?: boolean;
  /** When the drawing conveys real information (not purely decorative),
   *  pass false and the scene's label becomes its accessible name. */
  decorative?: boolean;
  /** Show the scene's optional reference caption (e.g. "FIG. 01 — STUDY"). */
  showCaption?: boolean;
  /** Hide the reference-grid (axis role) layer. Full hero-scale scenes read
   *  the grid as architectural context; at icon/thumbnail scale (a 140px
   *  principle-row diagram, a 48px card accent) five crossing grid lines
   *  compress into visual noise rather than a drafting field — turn it off
   *  for those. Defaults to true (shown) to match prior behavior. */
  showGrid?: boolean;
  /** Override the reveal-mode draw duration (ms). Small decorative
   *  placements (card accents, inline mini-diagrams) read better with a
   *  quicker, crisper draw than the ~1.9s cinematic duration used for
   *  full-size hero moments. Only applies in "reveal" mode. */
  durationMs?: number;
};

function pathKey(layerId: string, path: DrawingPath, i: number) {
  return `${layerId}-${path.d ?? path.line?.join(",") ?? path.circle?.join(",")}-${i}`;
}

const ROLE_ORDER = Object.keys(ROLE_STYLE) as LayerRole[];

export function ArchitecturalDrawing({
  scene,
  mode = "reveal",
  tone = "ink",
  viewBox = "0 0 640 480",
  className = "",
  interactive = false,
  highlighted = false,
  decorative = true,
  showCaption = false,
  showGrid = true,
  durationMs,
}: ArchitecturalDrawingProps) {
  const revealState = useReveal<SVGSVGElement>(0.2);
  const progressState = useScrollProgress<SVGSVGElement>(0.25);
  // Pointer parallax tracks the wrapping <div>, not the <svg> itself, so it
  // can own its own ref independently of the reveal/progress hook above —
  // merging two hook-owned refs onto one DOM node isn't safe to do by
  // mutating them in a shared callback ref.
  const { ref: parallaxRef, offset } = usePointerParallax<HTMLDivElement>(5);

  const svgRef = mode === "progress" ? progressState.ref : revealState.ref;
  const isVisible = mode === "reveal" ? revealState.isVisible : true;
  const progress = mode === "progress" ? progressState.progress : undefined;

  const stroke = tone === "ink" ? "var(--color-ink)" : "var(--color-night-ink)";
  const gold = "var(--color-gold)";

  const svg = (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      fill="none"
      className="w-full h-full"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : scene.label}
    >
      {scene.layers.map((layer) => {
        if (layer.role === "axis" && !showGrid) return null;
        const roleStyle = ROLE_STYLE[layer.role];
        const order = ROLE_ORDER.indexOf(layer.role);
        const layerStart = order / ROLE_ORDER.length;
        const layerEnd = layerStart + 1 / ROLE_ORDER.length;
        const layerProgress =
          progress === undefined
            ? undefined
            : Math.max(0, Math.min(1, (progress - layerStart) / (layerEnd - layerStart)));

        const isParallaxLayer = interactive && (layer.role === "site" || layer.role === "annotation");
        const color = roleStyle.useGold ? gold : stroke;
        const emphasis = roleStyle.useGold && highlighted;
        const baseOpacity = emphasis ? Math.min(1, roleStyle.opacity * 1.2) : roleStyle.opacity;
        const strokeWidth = emphasis ? roleStyle.strokeWidth + 0.5 : roleStyle.strokeWidth;
        // Stagger delays are tuned for the default ~1.9s cinematic duration;
        // scale them down proportionally for a shortened durationMs so a
        // quick decorative draw doesn't keep a disproportionately long pause
        // before it starts.
        const delayScale = durationMs !== undefined ? durationMs / 1900 : 1;
        const revealDelayMs = Math.round((order * 140 + (layer.delayMs ?? 0)) * delayScale);

        const duration = durationMs !== undefined ? `${durationMs}ms` : "var(--duration-line)";

        const children: ReactNode[] = layer.paths.map((path, i) => {
          const hasDash = Boolean(path.dash);
          const revealFraction = mode === "reveal" ? (isVisible ? 1 : 0) : (layerProgress ?? 0);

          const style: CSSProperties = hasDash
            ? {
                opacity: revealFraction,
                transition:
                  mode === "reveal"
                    ? `opacity ${duration} var(--ease-architectural) ${revealDelayMs}ms`
                    : "opacity 160ms linear",
              }
            : {
                strokeDasharray: 1,
                strokeDashoffset: 1 - revealFraction,
                transition:
                  mode === "reveal"
                    ? `stroke-dashoffset ${duration} var(--ease-architectural) ${revealDelayMs}ms`
                    : "stroke-dashoffset 160ms linear",
              };

          const key = pathKey(layer.id, path, i);

          if (path.circle) {
            const [cx, cy, r] = path.circle;
            return (
              <circle
                key={key}
                cx={cx}
                cy={cy}
                r={r}
                pathLength={1}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeOpacity={baseOpacity}
                style={style}
              />
            );
          }
          if (path.line) {
            const [x1, y1, x2, y2] = path.line;
            return (
              <line
                key={key}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                pathLength={hasDash ? undefined : 1}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeOpacity={baseOpacity}
                strokeDasharray={hasDash ? path.dash : undefined}
                style={style}
              />
            );
          }
          return (
            <path
              key={key}
              d={path.d}
              pathLength={hasDash ? undefined : 1}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeOpacity={baseOpacity}
              strokeDasharray={hasDash ? path.dash : undefined}
              style={style}
            />
          );
        });

        return (
          <g
            key={layer.id}
            style={
              isParallaxLayer
                ? { transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "transform 160ms ease-out" }
                : undefined
            }
          >
            {children}
          </g>
        );
      })}
      {showCaption && scene.caption ? (
        <text
          x={scene.caption.x}
          y={scene.caption.y}
          fill={stroke}
          opacity={0.35 * (mode === "reveal" ? (isVisible ? 1 : 0) : (progress ?? 0))}
          fontSize="11"
          letterSpacing="0.08em"
          fontFamily="var(--font-body)"
          style={{ transition: "opacity 900ms var(--ease-architectural) 900ms" }}
        >
          {scene.caption.text}
        </text>
      ) : null}
    </svg>
  );

  if (!interactive) {
    return <div className={className}>{svg}</div>;
  }

  return (
    <div ref={parallaxRef} className={className}>
      {svg}
    </div>
  );
}
