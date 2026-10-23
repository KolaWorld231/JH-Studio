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
