/**
 * Shared types for the Reactive Architectural Drawing System.
 *
 * A DrawingScene is a small, hand-composed set of layers (never randomly
 * generated) in a fixed 0-640 x 0-480 coordinate space, so the same scene
 * stays proportionate at any render size via the SVG viewBox. Layers are
 * grouped by role, which drives both reveal order (axis first, accents
 * last) and visual weight (stroke width/opacity) — this is what gives the
 * drawing a sense of architectural hierarchy instead of every line
 * appearing identically.
 */

export type LayerRole = "axis" | "primary" | "secondary" | "annotation" | "site" | "accent";

export type DrawingPath = {
  /** SVG path `d`, or omit and use points for a simple line/polyline. */
  d?: string;
  /** Shorthand for a straight line: [x1, y1, x2, y2]. */
  line?: [number, number, number, number];
  /** Shorthand for a circle marker: [cx, cy, r]. */
  circle?: [number, number, number];
  /** Dash pattern for non-solid lines (e.g. dimension lines, circulation paths). */
  dash?: string;
  /** Fills the shape (only meaningful for a closed `d`) with the role's
   *  color at low alpha — the "watercolor wash" highlighting a single
   *  volume/material, not a line technique. Use sparingly: one per scene. */
  wash?: boolean;
  /** A small technical annotation (dimension figure, angle degree, detail
   *  tag number) drawn as real SVG text next to this path, in the same
   *  fixed coordinate space. */
  label?: { text: string; x: number; y: number; size?: number };
};

export type DrawingLayer = {
  id: string;
  role: LayerRole;
  paths: DrawingPath[];
  /** Additional stagger within the role's base delay, in ms. */
  delayMs?: number;
};

export type DrawingScene = {
  id: string;
  /** Human-readable description, used only when the drawing is NOT aria-hidden. */
  label: string;
  layers: DrawingLayer[];
  /** Optional small reference caption (e.g. "FIG. 01 — STUDY"), drawn inside
   *  the SVG itself so it scales proportionally with the drawing. */
  caption?: { text: string; x: number; y: number };
};

/** Per-role visual weight and base reveal order. Lower order reveals first. */
export const ROLE_STYLE: Record<
  LayerRole,
  { order: number; strokeWidth: number; opacity: number; useGold?: boolean }
> = {
  // Softened from pure ink-black: the primary geometry should read as a
  // confident pencil line, not a bold graphic shape, so it never competes
  // with the gold accent for attention or with body copy for contrast.
  axis: { order: 0, strokeWidth: 1, opacity: 0.1 },
  primary: { order: 1, strokeWidth: 1.4, opacity: 0.8 },
  secondary: { order: 2, strokeWidth: 1, opacity: 0.45 },
  site: { order: 3, strokeWidth: 1, opacity: 0.35 },
  annotation: { order: 4, strokeWidth: 1, opacity: 0.4 },
  // The one line every scene resolves to — kept thin rather than heavy, so
  // "confident" reads as precision, not boldness.
  accent: { order: 5, strokeWidth: 1.4, opacity: 0.9, useGold: true },
};

/**
 * Generates a run of short parallel line segments inside a bounded strip —
 * the construction-document cutaway hatch (see reference: a roof/wall
 * section shown with diagonal fill lines). Deterministic, not random: given
 * the same inputs it always produces the same lines.
 */
export function hatchLines(
  x: number,
  y: number,
  width: number,
  height: number,
  spacing = 10,
  angleDeg = 45,
): DrawingPath[] {
  const angle = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const diag = Math.hypot(width, height) + spacing;
  const paths: DrawingPath[] = [];
  for (let offset = -diag; offset <= diag; offset += spacing) {
    // Line through a point offset along the hatch normal, clipped to the box.
    const nx = -dy;
    const ny = dx;
    const cx = x + width / 2 + nx * offset;
    const cy = y + height / 2 + ny * offset;
    const x1 = cx - dx * diag;
    const y1 = cy - dy * diag;
    const x2 = cx + dx * diag;
    const y2 = cy + dy * diag;
    // Clip to the box via simple parametric intersection against the rect
    // edges would be more precise, but for a decorative accent a generous
    // overdraw clipped by an SVG clipPath (applied by the caller) is
    // simpler and just as correct visually.
    paths.push({ line: [x1, y1, x2, y2] });
  }
  return paths;
}

/**
 * A short arc matching a drafting angle callout, with its degree figure
 * attached as the arc's own label (rendered next to the arc, not on it).
 */
export function angleMark(cx: number, cy: number, radius: number, startDeg: number, endDeg: number): DrawingPath {
  const start = (startDeg * Math.PI) / 180;
  const end = (endDeg * Math.PI) / 180;
  const x1 = cx + radius * Math.cos(start);
  const y1 = cy + radius * Math.sin(start);
  const x2 = cx + radius * Math.cos(end);
  const y2 = cy + radius * Math.sin(end);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const mid = (startDeg + endDeg) / 2;
  const labelX = cx + (radius + 12) * Math.cos((mid * Math.PI) / 180);
  const labelY = cy + (radius + 12) * Math.sin((mid * Math.PI) / 180);
  return {
    d: `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`,
    label: { text: `${endDeg - startDeg}°`, x: labelX, y: labelY, size: 9 },
  };
}
