"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/lib/hooks/use-reveal";
import { useDrawingMotion } from "@/lib/hooks/use-drawing-motion";
import { usePointerParallax } from "@/lib/hooks/use-pointer-parallax";
import { ROLE_STYLE, type DrawingPath, type DrawingScene, type LayerRole } from "@/lib/drawing/types";

type ArchitecturalDrawingProps = {
  scene: DrawingScene;
  /** Reveal once on entry, or scrub drawing progress directly with scroll. */
  mode?: "reveal" | "progress";
  tone?: "ink" | "paper";
  viewBox?: string;
  className?: string;
  /** Very small pointer depth on secondary layers; desktop fine-pointer only. */
  interactive?: boolean;
  /** Slow, real-time movement of construction layers only. */
  ambient?: boolean;
  highlighted?: boolean;
  decorative?: boolean;
  showCaption?: boolean;
  showGrid?: boolean;
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
  ambient = false,
  highlighted = false,
  decorative = true,
  showCaption = false,
  showGrid = true,
  durationMs,
}: ArchitecturalDrawingProps) {
  const revealState = useReveal<HTMLDivElement>(0.2);
  const motionRef = useDrawingMotion<HTMLDivElement>({ mode, ambient });
  const { ref: parallaxRef, offset } = usePointerParallax<HTMLDivElement>(5);
  const drawingRef = mode === "progress" ? motionRef : revealState.ref;
  const isVisible = revealState.isVisible;

  const stroke = tone === "ink" ? "var(--color-ink)" : "var(--color-night-ink)";
  const gold = "var(--color-gold)";

  const svg = (
    <svg
      viewBox={viewBox}
      fill="none"
      className="h-full w-full"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : scene.label}
    >
      {scene.layers.map((layer) => {
        if (layer.role === "axis" && !showGrid) return null;
        const roleStyle = ROLE_STYLE[layer.role];
        const order = ROLE_ORDER.indexOf(layer.role);
        const layerStart = order / ROLE_ORDER.length;
        const layerSpan = 1 / ROLE_ORDER.length;
        const isParallaxLayer = interactive && (layer.role === "site" || layer.role === "annotation");
        const isAmbientLayer = ambient && (layer.role === "axis" || layer.role === "site" || layer.role === "annotation");
        const color = roleStyle.useGold ? gold : stroke;
        const emphasis = roleStyle.useGold && highlighted;
        const baseOpacity = emphasis ? Math.min(1, roleStyle.opacity * 1.2) : roleStyle.opacity;
        const strokeWidth = emphasis ? roleStyle.strokeWidth + 0.5 : roleStyle.strokeWidth;
        const delayScale = durationMs !== undefined ? durationMs / 1900 : 1;
        const revealDelayMs = Math.round((order * 140 + (layer.delayMs ?? 0)) * delayScale);
        const duration = durationMs !== undefined ? `${durationMs}ms` : "var(--duration-line)";

        const groupStyle = {
          ...(mode === "progress"
            ? {
                "--layer-progress": `clamp(0, calc((var(--drawing-progress, 0) - ${layerStart}) / ${layerSpan}), 1)`,
              }
            : {}),
        } as CSSProperties;
        const transforms: string[] = [];
        if (isParallaxLayer) transforms.push(`translate(${offset.x}px, ${offset.y}px)`);
        if (isAmbientLayer) {
          transforms.push(
            layer.role === "annotation"
              ? "translate(calc(var(--draft-x, 0px) * -0.45), calc(var(--draft-y, 0px) * -0.45))"
              : "translate(var(--draft-x, 0px), var(--draft-y, 0px))",
          );
        }
        if (transforms.length) {
          groupStyle.transform = transforms.join(" ");
          groupStyle.transition = isParallaxLayer && !ambient ? "transform 160ms ease-out" : undefined;
        }

        const children: ReactNode[] = layer.paths.flatMap((path, i) => {
          const hasDash = Boolean(path.dash);
          const revealFraction = isVisible ? 1 : 0;
          let style: CSSProperties;

          if (mode === "progress") {
            style = hasDash
              ? {
                  opacity: "var(--layer-progress, 0)",
                  strokeDashoffset: ambient && layer.role !== "primary" ? "var(--draft-dash, 0)" : 0,
                }
              : {
                  strokeDasharray: 1,
                  strokeDashoffset: "calc(1 - var(--layer-progress, 0))",
                };
          } else if (hasDash) {
            style = {
              opacity: revealFraction,
              transition: `opacity ${duration} var(--ease-architectural) ${revealDelayMs}ms`,
            };
          } else {
            style = {
              strokeDasharray: 1,
              strokeDashoffset: 1 - revealFraction,
              transition: `stroke-dashoffset ${duration} var(--ease-architectural) ${revealDelayMs}ms`,
            };
          }

          const key = pathKey(layer.id, path, i);
          const elements: ReactNode[] = [];

          if (path.circle) {
            const [cx, cy, r] = path.circle;
            elements.push(
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
              />,
            );
          } else if (path.line) {
            const [x1, y1, x2, y2] = path.line;
            elements.push(
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
              />,
            );
          } else if (path.d) {
            const washStyle: CSSProperties = path.wash
              ? {
                  ...style,
                  transition:
                    mode === "reveal"
                      ? `${style.transition}, fill-opacity ${duration} var(--ease-architectural) ${revealDelayMs}ms`
                      : undefined,
                }
              : style;
            elements.push(
              <path
                key={key}
                d={path.d}
                fill={path.wash ? color : "none"}
                fillOpacity={path.wash ? (mode === "progress" ? "calc(var(--layer-progress, 0) * 0.1)" : revealFraction * 0.1) : undefined}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeOpacity={baseOpacity}
                strokeDasharray={hasDash ? path.dash : undefined}
                pathLength={hasDash ? undefined : 1}
                style={washStyle}
              />,
            );
          }

          if (path.label) {
            elements.push(
              <text
                key={`${key}-label`}
                x={path.label.x}
                y={path.label.y}
                fill={color}
                fillOpacity={baseOpacity}
                fontSize={path.label.size ?? 9}
                fontFamily="var(--font-body)"
                textAnchor="middle"
                style={{
                  opacity: mode === "progress" ? "var(--layer-progress, 0)" : revealFraction,
                  transition:
                    mode === "reveal"
                      ? `opacity ${duration} var(--ease-architectural) ${revealDelayMs}ms`
                      : undefined,
                }}
              >
                {path.label.text}
              </text>,
            );
          }

          return elements;
        });

        return (
          <g key={layer.id} style={groupStyle}>
            {children}
          </g>
        );
      })}
      {showCaption && scene.caption ? (
        <text
          x={scene.caption.x}
          y={scene.caption.y}
          fill={stroke}
          fontSize="11"
          letterSpacing="0.08em"
          fontFamily="var(--font-body)"
          style={{
            opacity:
              mode === "progress"
                ? "calc(0.35 * var(--drawing-progress, 0))"
                : 0.35 * (isVisible ? 1 : 0),
            transition: mode === "reveal" ? "opacity 900ms var(--ease-architectural) 900ms" : undefined,
          }}
        >
          {scene.caption.text}
        </text>
      ) : null}
    </svg>
  );

  const drawing = (
    <div
      ref={drawingRef}
      className={interactive ? "h-full w-full" : className}
      style={{ "--drawing-progress": mode === "progress" ? 0 : 1 } as CSSProperties}
    >
      {svg}
    </div>
  );

  if (!interactive) return drawing;
  return (
    <div ref={parallaxRef} className={className}>
      {drawing}
    </div>
  );
}
