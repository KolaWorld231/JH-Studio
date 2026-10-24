import type { DrawingLayer, DrawingScene } from "./types";

/**
 * Section companions for the Philosophy persistent model (see
 * src/components/philosophy-model.tsx). Each principle already has a plan
 * view in scenes.ts (`principleScenes`) — these are the matching section
 * cuts, sharing the same footprint x-range as their plan counterpart so the
 * two visually correspond when shown side by side. Same hand-composed,
 * never-random convention as every other scene in this system.
 */

function minimalAxis(groundY: number, id = "ground-axis"): DrawingLayer {
  return {
    id,
    role: "axis",
    paths: [
      { line: [60, groundY, 580, groundY] },
      { line: [320, groundY, 320, 40] },
    ],
  };
}

/** Knit People — a section with human-scale markers rising to meet the building edge. */
export const principleKnitPeopleSection: DrawingScene = {
  id: "principle-knit-people-section",
  label: "Section view showing social connection points meeting a building edge",
  layers: [
    minimalAxis(380),
    {
      id: "massing",
      role: "primary",
      paths: [{ d: "M220 180 L420 180 L420 380 L220 380" }],
    },
    {
      id: "threshold",
      role: "secondary",
      paths: [{ line: [260, 380, 260, 330] }, { line: [380, 380, 380, 330] }],
      delayMs: 200,
    },
    {
      id: "people-markers",
      role: "annotation",
      paths: [
        { circle: [140, 380, 6] },
        { circle: [500, 380, 6] },
        { circle: [320, 420, 6] },
      ],
      delayMs: 320,
    },
    {
      id: "connective-accent",
      role: "accent",
      paths: [
        { line: [140, 380, 220, 300] },
        { line: [500, 380, 420, 300] },
        { line: [320, 420, 320, 380] },
      ],
      delayMs: 440,
    },
  ],
};

/** Knit Spaces — a section with stacked floor partitions threaded by one circulation line. */
export const principleKnitSpacesSection: DrawingScene = {
  id: "principle-knit-spaces-section",
  label: "Section view of stacked floor partitions connected by a circulation path",
  layers: [
    minimalAxis(380),
    {
      id: "massing",
      role: "primary",
      paths: [{ d: "M200 140 L440 140 L440 380 L200 380 Z" }],
    },
    {
      id: "floor-partitions",
      role: "secondary",
      paths: [{ line: [200, 280, 440, 280] }, { line: [200, 210, 440, 210] }],
      delayMs: 220,
    },
    {
      id: "openings",
      role: "annotation",
      paths: [{ line: [310, 280, 330, 280] }, { line: [310, 210, 330, 210] }],
      delayMs: 340,
    },
    {
      id: "circulation",
      role: "accent",
      paths: [{ d: "M240 380 L240 280 L380 280 L380 210 L240 210 L240 140" }],
      delayMs: 460,
    },
  ],
};

/** Knit Architecture + Nature — a section where the massing meets a soft site contour and a canopy. */
export const principleKnitNatureSection: DrawingScene = {
  id: "principle-knit-nature-section",
  label: "Section view of a building massing meeting a landscape contour and canopy",
  layers: [
    minimalAxis(380),
    {
      id: "site-contour",
      role: "site",
      paths: [{ d: "M60 380 C 200 400, 440 400, 580 370" }],
    },
    {
      id: "massing",
      role: "primary",
      paths: [{ d: "M240 200 L400 200 L400 380 L240 380" }],
      delayMs: 180,
    },
    {
      id: "canopy",
      role: "annotation",
      paths: [{ circle: [470, 300, 24] }, { line: [470, 324, 470, 380] }],
      delayMs: 340,
    },
    {
      id: "connective-accent",
      role: "accent",
      paths: [{ line: [400, 260, 446, 300] }],
      delayMs: 460,
    },
  ],
};

/** Knit Context — a building read against a neighboring skyline of differing heights. */
export const principleKnitContextSection: DrawingScene = {
  id: "principle-knit-context-section",
  label: "Section view of a building read against neighboring massing of varied heights",
  layers: [
    minimalAxis(380),
    {
      id: "context-massing",
      role: "site",
      paths: [
        { d: "M80 260 L180 260 L180 380 L80 380 Z" },
        { d: "M460 220 L560 220 L560 380 L460 380 Z" },
      ],
    },
    {
      id: "massing",
      role: "primary",
      paths: [{ d: "M240 190 L400 190 L400 380 L240 380" }],
      delayMs: 200,
    },
    {
      id: "orientation-marks",
      role: "annotation",
      paths: [{ line: [320, 190, 320, 150], dash: "2 6" }],
      delayMs: 360,
    },
    {
      id: "connective-accent",
      role: "accent",
      paths: [{ circle: [320, 170, 3] }],
      delayMs: 480,
    },
  ],
};

/** Knit Movement & Function — a section with a vertical circulation core threading every level. */
export const principleKnitMovementSection: DrawingScene = {
  id: "principle-knit-movement-section",
  label: "Section view of a vertical circulation core threading every level of a building",
  layers: [
    minimalAxis(380),
    {
      id: "massing",
      role: "primary",
      paths: [{ d: "M220 150 L420 150 L420 380 L220 380 Z" }],
    },
    {
      id: "levels",
      role: "secondary",
      paths: [{ line: [220, 280, 420, 280] }],
      delayMs: 220,
    },
    {
      id: "circulation-core",
      role: "accent",
      paths: [{ d: "M260 380 L260 280 L300 280 L300 150", dash: "3 9" }],
      delayMs: 380,
    },
    {
      id: "direction-marks",
      role: "annotation",
      paths: [{ circle: [260, 380, 3] }, { circle: [300, 150, 3] }],
      delayMs: 500,
    },
  ],
};

export const philosophySectionScenes: Record<string, DrawingScene> = {
  "knit-people": principleKnitPeopleSection,
  "knit-spaces": principleKnitSpacesSection,
  "knit-architecture-nature": principleKnitNatureSection,
  "knit-context": principleKnitContextSection,
  "knit-movement-function": principleKnitMovementSection,
};
