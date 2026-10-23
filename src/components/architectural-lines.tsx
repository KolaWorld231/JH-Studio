"use client";

import { useReveal } from "@/lib/hooks/use-reveal";

type ArchitecturalLinesProps = {
  variant?: "hero" | "panel" | "divider";
  tone?: "ink" | "paper";
  className?: string;
};

/**
 * An original, illustrative architectural-drawing motif (grid, axis marks,
 * and a plan-like outline) used as a recurring visual motif across the
 * site. It is not, and must never be presented as, a real project plan.
 */
export function ArchitecturalLines({
  variant = "hero",
  tone = "ink",
  className = "",
}: ArchitecturalLinesProps) {
  const { ref, isVisible } = useReveal<SVGSVGElement>(0.2);
  const stroke = tone === "ink" ? "var(--color-ink)" : "var(--color-night-ink)";
  const gold = "var(--color-gold)";

  return (
    <svg
      ref={ref}
      className={`line-draw ${isVisible ? "is-visible" : ""} ${className}`}
      viewBox="0 0 640 480"
      fill="none"
      role="img"
      aria-label="Abstract architectural line drawing, a recurring JH Studio visual motif"
    >
      {/* alignment grid */}
      {[0, 160, 320, 480, 640].map((x, i) => (
        <line
          key={`v-${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="480"
          pathLength={1}
          stroke={stroke}
          strokeOpacity="0.14"
          strokeWidth="1"
          style={{ ["--line-delay" as string]: `${i * 40}ms` }}
        />
      ))}
      {[0, 120, 240, 360, 480].map((y, i) => (
        <line
          key={`h-${y}`}
          x1="0"
          y1={y}
          x2="640"
          y2={y}
          pathLength={1}
          stroke={stroke}
          strokeOpacity="0.14"
          strokeWidth="1"
          style={{ ["--line-delay" as string]: `${i * 40 + 120}ms` }}
        />
      ))}

      {/* plan-like outline resolving from the grid */}
      <path
        d="M120 360 L120 160 L260 120 L420 120 L420 200 L520 200 L520 360 Z"
        pathLength={1}
        stroke={stroke}
        strokeWidth="1.5"
        style={{ ["--line-delay" as string]: "320ms" }}
      />
      <path
        d="M260 120 L260 200 L420 200"
        pathLength={1}
        stroke={stroke}
        strokeOpacity="0.6"
        strokeWidth="1.2"
        style={{ ["--line-delay" as string]: "520ms" }}
      />
      <path
        d="M120 280 L420 280"
        pathLength={1}
        stroke={stroke}
        strokeOpacity="0.5"
        strokeWidth="1"
        style={{ ["--line-delay" as string]: "620ms" }}
      />

      {/* gold accent: a single emphasized connective line */}
      <path
        d="M120 360 L520 360 L520 200"
        pathLength={1}
        stroke={gold}
        strokeWidth="1.75"
        style={{ ["--line-delay" as string]: "760ms" }}
      />

      {/* dimension / axis marks */}
      <path
        d="M110 160 L130 160 M110 360 L130 360"
        pathLength={1}
        stroke={stroke}
        strokeWidth="1"
        strokeOpacity="0.5"
        style={{ ["--line-delay" as string]: "900ms" }}
      />
      <circle
        cx="120"
        cy="160"
        r="3"
        pathLength={1}
        stroke={gold}
        strokeWidth="1.5"
        style={{ ["--line-delay" as string]: "980ms" }}
      />

      {variant === "hero" ? (
        <text
          x="120"
          y="400"
          fill={stroke}
          opacity="0.35"
          fontSize="11"
          letterSpacing="0.08em"
          fontFamily="var(--font-body)"
        >
          FIG. 01 — STUDY
        </text>
      ) : null}
    </svg>
  );
}
