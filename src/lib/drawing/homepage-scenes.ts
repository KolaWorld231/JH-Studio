import type { DrawingLayer, DrawingPath, DrawingScene } from "./types";

/**
 * The three scroll-band scenes for the parent homepage's signature scene
 * (see src/components/drawing/signature-scene.tsx): plan -> axonometric ->
 * urban field. Each scene shares identically-keyed layer ids
 * ("footprint", "circulation", "context-ring", "gold-thread") so the
 * renderer can crossfade matching layers across scenes — the composition
 * reads as the same geometry reorganizing, not unrelated art swapping.
 * Hand-composed, never procedural, same 0-640x0-480 convention as every
 * other scene in this system.
 */

function gridAxis(id = "grid"): DrawingLayer {
  return {
    id,
    role: "axis",
    paths: [
      ...[0, 160, 320, 480, 640].map((x) => ({ line: [x, 0, x, 480] as [number, number, number, number] })),
      ...[0, 120, 240, 360, 480].map((y) => ({ line: [0, y, 640, y] as [number, number, number, number] })),
    ],
  };
}

/** A simple axonometric "lifted" box: a base face, a roof face offset by
 *  (dx, dy), and four verticals connecting corresponding corners. */
function isoBox(x: number, y: number, width: number, height: number, dx: number, dy: number): DrawingPath[] {
  return [
    { d: `M${x} ${y} h${width} v${height} h${-width} Z` },
    { d: `M${x + dx} ${y + dy} h${width} v${height} h${-width} Z` },
    { line: [x, y, x + dx, y + dy] },
    { line: [x + width, y, x + width + dx, y + dy] },
    { line: [x, y + height, x + dx, y + height + dy] },
    { line: [x + width, y + height, x + width + dx, y + height + dy] },
  ];
}

export const homepagePlanScene: DrawingScene = {
  id: "homepage-plan",
  label: "Plan drawing of a building footprint within a widening site boundary",
  caption: { text: "FIG. 00 — PLAN", x: 70, y: 452 },
  layers: [
    gridAxis(),
    {
      id: "context-ring",
      role: "site",
      paths: [{ d: "M100 110 L540 110 L540 410 L100 410 Z", dash: "2 8" }],
    },
    {
      id: "footprint",
      role: "primary",
      paths: [{ d: "M220 180 L420 180 L420 340 L220 340 Z" }],
      delayMs: 160,
    },
    {
      id: "circulation",
      role: "secondary",
      paths: [{ d: "M220 260 L420 260" }, { line: [320, 180, 320, 260] }],
      delayMs: 300,
    },
    {
      id: "gold-thread",
      role: "accent",
      paths: [{ d: "M140 400 L220 340 L320 260 L420 180 L500 120" }],
      delayMs: 460,
    },
  ],
};

export const homepageAxonometricScene: DrawingScene = {
  id: "homepage-axonometric",
  label: "Axonometric volume of the same building lifted from the plan",
  caption: { text: "FIG. 00 — AXONOMETRIC", x: 70, y: 452 },
  layers: [
    gridAxis(),
    {
      id: "context-ring",
      role: "site",
      paths: [{ d: "M90 300 L470 300 L540 230 L160 230 Z", dash: "2 8" }],
    },
    {
      id: "footprint",
      role: "primary",
      paths: isoBox(220, 180, 160, 140, -70, -70),
      delayMs: 160,
    },
    {
      id: "circulation",
      role: "secondary",
      paths: [{ line: [150, 180, 300, 110] }, { line: [150, 250, 300, 180] }],
      delayMs: 300,
    },
    {
      id: "gold-thread",
      role: "accent",
      paths: [{ d: "M150 320 L150 180 L220 110 L380 110 L450 40" }],
      delayMs: 460,
    },
  ],
};

export const homepageUrbanFieldScene: DrawingScene = {
  id: "homepage-urban-field",
  label: "The same building set within a wider field of neighboring volumes",
  caption: { text: "FIG. 00 — URBAN FIELD", x: 70, y: 452 },
  layers: [
    gridAxis(),
    {
      id: "context-ring",
      role: "site",
      paths: [
        ...isoBox(60, 260, 90, 80, -40, -40),
        ...isoBox(480, 240, 100, 90, -40, -40),
        ...isoBox(440, 340, 70, 60, -30, -30),
      ],
    },
    {
      id: "footprint",
      role: "primary",
      paths: isoBox(260, 190, 110, 100, -50, -50),
      delayMs: 160,
    },
    {
      id: "circulation",
      role: "secondary",
      paths: [
        { line: [150, 300, 260, 240] },
        { line: [370, 240, 480, 280] },
        { line: [260, 290, 440, 370] },
      ],
      delayMs: 300,
    },
    {
      id: "gold-thread",
      role: "accent",
      paths: [{ d: "M100 320 L260 240 L315 140 L480 280 L545 220" }],
      delayMs: 460,
    },
  ],
};

export const homepageScenes = [homepagePlanScene, homepageAxonometricScene, homepageUrbanFieldScene] as const;
