import { angleMark, hatchLines, type DrawingLayer, type DrawingScene } from "./types";

/** Standard 5x5 alignment grid shared by every full-size scene. */
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

function dimensionTicks(id: string, points: [number, number, number, number][]): DrawingLayer {
  return {
    id,
    role: "annotation",
    paths: points.map(([x1, y1, x2, y2]) => ({ line: [x1, y1, x2, y2] })),
  };
}

// ---------------------------------------------------------------------------
// Default / hero scene — the original JH Studio motif (a plan resolving from
// the grid, with one emphasized gold connective line). Kept byte-for-byte
// equivalent to the original ArchitecturalLines geometry so every existing
// usage (parent homepage, Real Estate Development, 404) renders unchanged.
// ---------------------------------------------------------------------------
export const defaultScene: DrawingScene = {
  id: "default",
  label: "Abstract architectural line drawing, a recurring JH Studio visual motif",
  caption: { text: "FIG. 01 — STUDY", x: 120, y: 400 },
  layers: [
    gridAxis(),
    {
      id: "plan-outline",
      role: "primary",
      paths: [{ d: "M120 360 L120 160 L260 120 L420 120 L420 200 L520 200 L520 360 Z" }],
    },
    {
      id: "plan-partition",
      role: "secondary",
      paths: [{ d: "M260 120 L260 200 L420 200" }],
      delayMs: 200,
    },
    {
      id: "plan-divider",
      role: "secondary",
      paths: [{ d: "M120 280 L420 280" }],
      delayMs: 300,
    },
    {
      id: "connective-accent",
      role: "accent",
      paths: [{ d: "M120 360 L520 360 L520 200" }],
    },
    dimensionTicks("dim-ticks", [
      [110, 160, 130, 160],
      [110, 360, 130, 360],
    ]),
    {
      id: "ref-point",
      role: "accent",
      paths: [{ circle: [120, 160, 3] }],
      delayMs: 80,
    },
  ],
};

// ---------------------------------------------------------------------------
// Knitted Architecture landing hero — a richer composition: the plan resolves
// and a second, lighter "elevation" register rises above it, suggesting plan
// and section read together.
// ---------------------------------------------------------------------------
export const kaHeroScene: DrawingScene = {
  id: "ka-hero",
  label: "Architectural plan and elevation study resolving from a drafting grid",
  caption: { text: "FIG. 01 — PLAN + ELEVATION", x: 120, y: 400 },
  layers: [
    gridAxis(),
    {
      id: "elevation",
      role: "secondary",
      paths: [{ d: "M160 110 L160 60 L300 40 L440 60 L440 110" }],
      delayMs: 0,
    },
    {
      id: "plan-outline",
      role: "primary",
      paths: [{ d: "M120 360 L120 160 L260 120 L420 120 L420 200 L520 200 L520 360 Z" }],
      delayMs: 120,
    },
    {
      id: "plan-partition",
      role: "secondary",
      paths: [{ d: "M260 120 L260 200 L420 200" }, { d: "M120 280 L420 280" }],
      delayMs: 260,
    },
    {
      id: "circulation",
      role: "secondary",
      paths: [{ d: "M180 360 L180 300 L300 300 L300 200", dash: "2 10" }],
      delayMs: 420,
    },
    {
      id: "connective-accent",
      role: "accent",
      paths: [{ d: "M120 360 L520 360 L520 200" }],
      delayMs: 560,
    },
    // A single soft gold wash on the elevation's near face — the one
    // "watercolor highlight" per scene, not a repeated treatment.
    {
      id: "elevation-wash",
      role: "accent",
      paths: [{ d: "M160 110 L160 60 L300 40 L300 110 Z", wash: true }],
      delayMs: 40,
    },
    {
      id: "dim-ticks",
      role: "annotation",
      paths: [
        { line: [110, 160, 130, 160], label: { text: "6.0 M", x: 84, y: 164 } },
        { line: [110, 360, 130, 360] },
      ],
    },
    // One drafting angle callout at the roof ridge — restrained to a
    // single annotation, matching a construction-document detail rather
    // than covering the drawing in callouts.
    {
      id: "ridge-angle",
      role: "annotation",
      paths: [angleMark(300, 40, 26, 10, 170)],
      delayMs: 200,
    },
    {
      id: "ref-points",
      role: "accent",
      paths: [
        { circle: [120, 160, 3], label: { text: "01", x: 120, y: 144 } },
        { circle: [300, 300, 2.5], label: { text: "A", x: 300, y: 286 } },
      ],
      delayMs: 640,
    },
  ],
};

// ---------------------------------------------------------------------------
// The five Knitted Architecture principles — each a distinct composition in
// the same vocabulary (grid, footprint, accent), expressing its own idea.
// These are original illustrative motifs, not real project drawings.
// ---------------------------------------------------------------------------

/** Knit People — a footprint with social nodes knitted to it by fine lines. */
export const principleKnitPeopleScene: DrawingScene = {
  id: "principle-knit-people",
  label: "Illustrative diagram of a building footprint connected to surrounding social nodes",
  layers: [
    gridAxis(),
    {
      id: "footprint",
      role: "primary",
      paths: [{ d: "M220 180 L420 180 L420 340 L220 340 Z" }],
    },
    {
      id: "nodes",
      role: "annotation",
      paths: [
        { circle: [140, 140, 6] },
        { circle: [500, 150, 6] },
        { circle: [520, 380, 6] },
        { circle: [150, 400, 6] },
        { circle: [320, 420, 6] },
      ],
      delayMs: 160,
    },
    {
      id: "knit-lines",
      role: "accent",
      paths: [
        { line: [220, 200, 140, 140] },
        { line: [420, 200, 500, 150] },
        { line: [420, 320, 520, 380] },
        { line: [220, 320, 150, 400] },
        { line: [300, 340, 320, 420] },
      ],
      delayMs: 320,
    },
  ],
};

/** Knit Spaces — adjacent rooms sharing edges, threaded by one circulation line. */
export const principleKnitSpacesScene: DrawingScene = {
  id: "principle-knit-spaces",
  label: "Illustrative diagram of adjoining rooms connected by a shared circulation path",
  layers: [
    gridAxis(),
    {
      id: "rooms",
      role: "primary",
      paths: [
        { d: "M160 160 L320 160 L320 280 L160 280 Z" },
        { d: "M320 160 L480 160 L480 260 L320 260 Z" },
        { d: "M160 280 L340 280 L340 400 L160 400 Z" },
        { d: "M340 260 L480 260 L480 400 L340 400 Z" },
      ],
    },
    {
      id: "openings",
      role: "secondary",
      paths: [
        { line: [320, 200, 320, 230] },
        { line: [240, 280, 270, 280] },
        { line: [340, 320, 340, 350] },
      ],
      delayMs: 220,
    },
    {
      id: "circulation",
      role: "accent",
      paths: [{ d: "M200 240 L320 215 L320 215 L410 215 L410 330 L340 335" }],
      delayMs: 400,
    },
  ],
};

/** Knit Architecture + Nature — a rectilinear footprint set within a soft site contour. */
export const principleKnitNatureScene: DrawingScene = {
  id: "principle-knit-nature",
  label: "Illustrative diagram of a building footprint integrated with surrounding landscape contours",
  layers: [
    gridAxis(),
    {
      id: "site-contours",
      role: "site",
      paths: [
        { d: "M60 400 C 180 440, 460 440, 580 380" },
        { d: "M40 320 C 200 360, 440 360, 600 300" },
      ],
    },
    {
      id: "footprint",
      role: "primary",
      paths: [{ d: "M220 180 L420 180 L420 320 L220 320 Z" }],
      delayMs: 180,
    },
    {
      id: "canopy-markers",
      role: "annotation",
      paths: [
        { circle: [170, 360, 10] },
        { circle: [480, 350, 8] },
        { circle: [500, 220, 7] },
      ],
      delayMs: 340,
    },
    {
      id: "connective-accent",
      role: "accent",
      paths: [
        { line: [220, 320, 170, 360] },
        { line: [420, 300, 480, 350] },
      ],
      delayMs: 480,
    },
  ],
};

/** Knit Context — a footprint read against widening site/neighborhood boundaries. */
export const principleKnitContextScene: DrawingScene = {
  id: "principle-knit-context",
  label: "Illustrative diagram of a building footprint set within widening site context boundaries",
  layers: [
    gridAxis(),
    {
      id: "context-rings",
      role: "site",
      paths: [
        { d: "M100 100 L540 100 L540 420 L100 420 Z" },
        { d: "M160 150 L480 150 L480 380 L160 380 Z" },
      ],
    },
    {
      id: "footprint",
      role: "primary",
      paths: [{ d: "M240 200 L420 200 L420 330 L240 330 Z" }],
      delayMs: 200,
    },
    {
      id: "orientation-marks",
      role: "annotation",
      paths: [
        { line: [330, 100, 330, 70], dash: "2 6" },
        { line: [540, 260, 580, 260], dash: "2 6" },
      ],
      delayMs: 360,
    },
    {
      id: "connective-accent",
      role: "accent",
      paths: [{ circle: [330, 265, 3] }],
      delayMs: 480,
    },
  ],
};

/** Knit Movement & Function — a footprint with an emphasized circulation spine. */
export const principleKnitMovementScene: DrawingScene = {
  id: "principle-knit-movement",
  label: "Illustrative diagram of a building footprint with an emphasized circulation path",
  layers: [
    gridAxis(),
    {
      id: "footprint",
      role: "primary",
      paths: [{ d: "M200 150 L460 150 L460 370 L200 370 Z" }],
    },
    {
      id: "zones",
      role: "secondary",
      paths: [
        { line: [200, 240, 460, 240] },
        { line: [320, 150, 320, 240] },
      ],
      delayMs: 220,
    },
    {
      id: "circulation-path",
      role: "accent",
      paths: [{ d: "M220 360 L220 260 L440 260 L440 170", dash: "3 9" }],
      delayMs: 380,
    },
    {
      id: "direction-marks",
      role: "annotation",
      paths: [{ circle: [220, 360, 3] }, { circle: [440, 170, 3] }],
      delayMs: 520,
    },
  ],
};

export const principleScenes: Record<string, DrawingScene> = {
  "knit-people": principleKnitPeopleScene,
  "knit-spaces": principleKnitSpacesScene,
  "knit-architecture-nature": principleKnitNatureScene,
  "knit-context": principleKnitContextScene,
  "knit-movement-function": principleKnitMovementScene,
};

// ---------------------------------------------------------------------------
// Process — a design-development composition: a rough early massing resolves
// into a refined, dimensioned plan.
// ---------------------------------------------------------------------------
export const processScene: DrawingScene = {
  id: "process",
  label: "Illustrative diagram of a design concept developing into a resolved architectural plan",
  layers: [
    gridAxis(),
    {
      id: "concept-massing",
      role: "secondary",
      paths: [{ d: "M160 140 L460 140 L460 380 L160 380 Z" }],
    },
    {
      id: "refined-plan",
      role: "primary",
      paths: [{ d: "M200 180 L340 160 L440 180 L440 260 L500 260 L500 380 L200 380 Z" }],
      delayMs: 220,
    },
    {
      id: "development-lines",
      role: "secondary",
      paths: [{ d: "M340 160 L340 260 L440 260" }, { d: "M200 300 L440 300" }],
      delayMs: 380,
    },
    {
      id: "connective-accent",
      role: "accent",
      paths: [{ d: "M200 380 L500 380 L500 260" }],
      delayMs: 520,
    },
    dimensionTicks("dim-ticks", [
      [190, 180, 210, 180],
      [190, 380, 210, 380],
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Process, street study — a one-point-perspective sketch (building massing,
// a receding street, a site tree) in the hand-drafted construction-sketch
// register the owner referenced, distinct from the plan/elevation register
// used everywhere else. One composition, used once, in the Process closing
// section — not a new sitewide drawing type.
// ---------------------------------------------------------------------------
export const processPerspectiveScene: DrawingScene = {
  id: "process-perspective",
  label: "One-point perspective sketch of a building massing along a receding street",
  caption: { text: "FIG. 02 — SITE STUDY", x: 70, y: 430 },
  layers: [
    {
      id: "ground",
      role: "secondary",
      paths: [{ line: [40, 400, 600, 400] }],
    },
    {
      id: "building",
      role: "primary",
      paths: [{ d: "M70 400 L70 170 L230 170 L230 400" }],
      delayMs: 120,
    },
    {
      id: "perspective-lines",
      role: "annotation",
      paths: [
        { line: [70, 170, 560, 230], dash: "2 7" },
        { line: [230, 170, 560, 230], dash: "2 7" },
        { line: [70, 400, 560, 230], dash: "2 7" },
        { line: [230, 400, 560, 230], dash: "2 7" },
      ],
      delayMs: 300,
    },
    {
      id: "site-tree",
      role: "site",
      paths: [{ circle: [480, 326, 15] }, { line: [480, 341, 480, 400] }],
      delayMs: 440,
    },
    {
      id: "vanishing-point",
      role: "accent",
      paths: [{ circle: [560, 230, 2.5] }],
      delayMs: 560,
    },
  ],
};

// ---------------------------------------------------------------------------
// Contact — a quiet closing composition: just a few lines resolving to a
// single connective point. Deliberately sparse, no full grid.
// ---------------------------------------------------------------------------
export const contactScene: DrawingScene = {
  id: "contact",
  label: "A few architectural reference lines resolving to a single connecting point",
  layers: [
    {
      id: "reference-lines",
      role: "secondary",
      paths: [
        { line: [80, 80, 320, 240] },
        { line: [560, 60, 320, 240] },
        { line: [120, 400, 320, 240] },
        { line: [540, 420, 320, 240] },
      ],
    },
    {
      id: "connective-accent",
      role: "accent",
      paths: [{ circle: [320, 240, 4] }],
      delayMs: 700,
    },
  ],
};

// ---------------------------------------------------------------------------
// Card accent — a compact corner motif for project-card hover/focus states.
// Deliberately generic (not tied to any principle) so it never risks reading
// as a real project's own drawing.
// ---------------------------------------------------------------------------
export const cardAccentScene: DrawingScene = {
  id: "card-accent",
  label: "Decorative corner linework",
  layers: [
    {
      id: "corner-lines",
      role: "secondary",
      paths: [
        { line: [0, 40, 40, 40] },
        { line: [40, 0, 40, 40] },
      ],
    },
    {
      id: "corner-accent",
      role: "accent",
      paths: [{ circle: [40, 40, 2.5] }],
      delayMs: 120,
    },
  ],
};

// ---------------------------------------------------------------------------
// Schematic corner — a denser construction-document fragment (a roof-truss
// corner, cross-braced, hatched, with a dimension and an angle callout),
// meant to sit behind a page's opening section at low opacity, masked so it
// concentrates in one corner and fades out before it ever reaches text. Not
// a real structural detail — illustrative drafting texture only.
// ---------------------------------------------------------------------------
export const schematicCornerScene: DrawingScene = {
  id: "schematic-corner",
  label: "",
  layers: [
    {
      id: "roof-outline",
      role: "primary",
      paths: [{ d: "M600 40 L420 180 L640 180" }, { d: "M420 180 L640 180" }],
    },
    {
      id: "truss-members",
      role: "secondary",
      paths: [
        { line: [600, 40, 510, 180] },
        { line: [600, 40, 600, 180] },
        { line: [600, 40, 640, 150] },
      ],
      delayMs: 160,
    },
    {
      id: "hatch",
      role: "annotation",
      paths: hatchLines(430, 45, 170, 130, 11, 45),
      delayMs: 280,
    },
    {
      id: "dimension",
      role: "annotation",
      paths: [
        { line: [420, 195, 510, 195], dash: "2 6" },
        { d: "M420 195 L420 189", label: { text: "1.3 M", x: 465, y: 212, size: 9 } },
      ],
      delayMs: 360,
    },
    {
      id: "apex-angle",
      role: "annotation",
      paths: [angleMark(600, 40, 22, 100, 170)],
      delayMs: 420,
    },
    {
      id: "joint-accent",
      role: "accent",
      paths: [{ circle: [600, 40, 2.5] }],
      delayMs: 520,
    },
  ],
};
