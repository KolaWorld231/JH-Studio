import { angleMark, type DrawingPath, type DrawingScene } from "./types";

/** A wireframe box with a front face, a receding face, and four connectors. */
function perspectiveBox(
  x: number,
  y: number,
  width: number,
  height: number,
  depthX: number,
  depthY: number,
): DrawingPath[] {
  return [
    { d: `M${x} ${y} h${width} v${height} h${-width} Z` },
    { d: `M${x + depthX} ${y + depthY} h${width} v${height} h${-width} Z` },
    { line: [x, y, x + depthX, y + depthY] },
    { line: [x + width, y, x + width + depthX, y + depthY] },
    { line: [x, y + height, x + depthX, y + height + depthY] },
    { line: [x + width, y + height, x + width + depthX, y + height + depthY] },
  ];
}

/**
 * Deterministic two-point urban perspective. Dense frames stay at the outer
 * edges and the centre remains open, matching the supplied street sketches.
 */
export const urbanPerspectiveScene: DrawingScene = {
  id: "urban-perspective",
  label: "Layered architectural perspective with street frames and construction guides",
  caption: { text: "FIG. 03 — PERSPECTIVE FIELD", x: 214, y: 452 },
  layers: [
    {
      id: "construction-field",
      role: "axis",
      paths: [
        { line: [24, 276, 616, 276], dash: "3 10" },
        { line: [320, 36, 320, 430], dash: "2 12" },
        { line: [48, 64, 320, 276], dash: "3 11" },
        { line: [592, 64, 320, 276], dash: "3 11" },
        { line: [28, 430, 320, 276], dash: "3 11" },
        { line: [612, 430, 320, 276], dash: "3 11" },
      ],
    },
    {
      id: "distant-massing",
      role: "site",
      paths: [
        ...perspectiveBox(238, 196, 62, 108, 24, -18),
        ...perspectiveBox(344, 184, 66, 120, -24, -18),
        { line: [300, 276, 320, 260] },
        { line: [344, 276, 320, 260] },
      ],
      delayMs: 120,
    },
    {
      id: "primary-frames",
      role: "primary",
      paths: [
        ...perspectiveBox(46, 128, 142, 252, 82, -54),
        ...perspectiveBox(448, 116, 138, 264, -78, -52),
        { d: "M198 380 L198 204 L260 178 L260 354 Z" },
        { d: "M380 380 L380 202 L442 178 L442 354 Z" },
      ],
      delayMs: 220,
    },
    {
      id: "facade-and-ground",
      role: "secondary",
      paths: [
        { line: [82, 128, 82, 380] },
        { line: [122, 128, 122, 380] },
        { line: [164, 128, 164, 380] },
        { line: [486, 116, 486, 380] },
        { line: [526, 116, 526, 380] },
        { line: [566, 116, 566, 380] },
        { line: [46, 206, 188, 206] },
        { line: [448, 204, 586, 204] },
        { line: [46, 292, 188, 292] },
        { line: [448, 292, 586, 292] },
        { line: [22, 420, 320, 276] },
        { line: [110, 446, 320, 276] },
        { line: [530, 446, 320, 276] },
        { line: [618, 420, 320, 276] },
      ],
      delayMs: 340,
    },
    {
      id: "dimensions-and-nodes",
      role: "annotation",
      paths: [
        { line: [46, 398, 188, 398], dash: "2 6" },
        { line: [46, 390, 46, 406], label: { text: "8.40", x: 116, y: 414, size: 8 } },
        { line: [188, 390, 188, 406] },
        { line: [448, 398, 586, 398], dash: "2 6" },
        { circle: [320, 276, 2.5], label: { text: "VP", x: 320, y: 294, size: 8 } },
      ],
      delayMs: 440,
    },
    {
      id: "knitted-route",
      role: "accent",
      paths: [
        { d: "M128 380 L260 354 L320 330 L380 354 L512 380" },
        { circle: [320, 330, 3] },
      ],
      delayMs: 540,
    },
  ],
};

/** Roof section / plan overlay: strong section, light plan, sparse dimensions. */
export const roofStudyScene: DrawingScene = {
  id: "roof-study",
  label: "Architectural roof section with truss, hatch, plan overlay, and dimensions",
  caption: { text: "FIG. 04 — SECTION STUDY", x: 218, y: 452 },
  layers: [
    {
      id: "reference-axes",
      role: "axis",
      paths: [
        { line: [64, 344, 576, 344], dash: "8 7 2 7" },
        { line: [320, 62, 320, 410], dash: "8 7 2 7" },
        { line: [112, 108, 548, 390], dash: "3 11" },
      ],
    },
    {
      id: "plan-overlay",
      role: "site",
      paths: [
        { d: "M376 74 L574 152 L492 304 L294 226 Z" },
        { d: "M398 106 L534 160 L478 268 L342 214 Z" },
        { line: [376, 74, 478, 268] },
        { line: [574, 152, 342, 214] },
      ],
    },
    {
      id: "roof-section",
      role: "primary",
      paths: [
        { d: "M88 344 L320 124 L552 344" },
        { d: "M100 354 L320 140 L540 354" },
        { line: [88, 344, 100, 354] },
        { line: [552, 344, 540, 354] },
        { line: [116, 354, 524, 354] },
        { line: [142, 354, 142, 408] },
        { line: [498, 354, 498, 408] },
      ],
      delayMs: 180,
    },
    {
      id: "truss-and-hatch",
      role: "secondary",
      paths: [
        { line: [320, 140, 320, 354] },
        { line: [220, 254, 420, 254] },
        { line: [220, 254, 320, 354] },
        { line: [420, 254, 320, 354] },
        { line: [220, 254, 320, 140] },
        { line: [420, 254, 320, 140] },
        { line: [176, 324, 190, 310] },
        { line: [194, 324, 208, 310] },
        { line: [212, 324, 226, 310] },
        { line: [230, 324, 244, 310] },
        { line: [396, 310, 410, 324] },
        { line: [414, 310, 428, 324] },
        { line: [432, 310, 446, 324] },
        { line: [450, 310, 464, 324] },
      ],
      delayMs: 320,
    },
    {
      id: "dimensions",
      role: "annotation",
      paths: [
        { line: [70, 124, 70, 354], dash: "2 7" },
        { line: [60, 124, 80, 124], label: { text: "2.25", x: 46, y: 242, size: 9 } },
        { line: [60, 354, 80, 354] },
        { line: [142, 422, 498, 422], dash: "2 7" },
        { line: [142, 414, 142, 430], label: { text: "9.55", x: 320, y: 440, size: 9 } },
        { line: [498, 414, 498, 430] },
        angleMark(320, 124, 30, 35, 65),
      ],
      delayMs: 430,
    },
    {
      id: "ridge-connection",
      role: "accent",
      paths: [
        { circle: [320, 124, 3.5] },
        { d: "M320 124 L320 92 L382 92" },
      ],
      delayMs: 540,
    },
  ],
};
