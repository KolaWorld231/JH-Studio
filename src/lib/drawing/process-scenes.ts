import type { DrawingLayer, DrawingScene } from "./types";

/**
 * Six stage compositions for the Process stepper (see
 * src/components/process-stepper.tsx): Listen → Read the site → Connect →
 * Test → Resolve → Build. Each stage is a plan/section pair sharing the
 * same footprint coordinates, so the pair reads as the same project
 * developing rather than six unrelated diagrams. Hand-composed, never
 * random, same 0-640x0-480 convention as every other scene in this system.
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

function groundAxis(groundY = 380, id = "ground"): DrawingLayer {
  return {
    id,
    role: "axis",
    paths: [
      { line: [60, groundY, 580, groundY] },
      { line: [320, groundY, 320, 40] },
    ],
  };
}

export type ProcessStage = {
  id: string;
  label: string;
  description: string;
  plan: DrawingScene;
  section: DrawingScene;
};

export const processStages: ProcessStage[] = [
  {
    id: "listen",
    label: "Listen",
    description: "The earliest conversation — a site and a brief, before any geometry.",
    plan: {
      id: "process-listen-plan",
      label: "A nearly empty drafting field with a few reference points",
      layers: [
        gridAxis(),
        {
          id: "reference-points",
          role: "annotation",
          paths: [{ circle: [320, 240, 3] }, { circle: [220, 300, 2.5] }, { circle: [420, 190, 2.5] }],
        },
      ],
    },
    section: {
      id: "process-listen-section",
      label: "An empty ground line with a few reference points, nothing built yet",
      layers: [
        groundAxis(),
        {
          id: "reference-points",
          role: "annotation",
          paths: [{ circle: [320, 380, 3] }, { circle: [220, 380, 2.5] }],
        },
      ],
    },
  },
  {
    id: "read-the-site",
    label: "Read the site",
    description: "Context, climate, and neighboring conditions enter the drawing.",
    plan: {
      id: "process-read-site-plan",
      label: "Site contours and context boundaries, no building yet",
      layers: [
        gridAxis(),
        {
          id: "site-contours",
          role: "site",
          paths: [
            { d: "M60 400 C 180 440, 460 440, 580 380" },
            { d: "M100 120 L540 120 L540 420 L100 420 Z", dash: "2 8" },
          ],
        },
      ],
    },
    section: {
      id: "process-read-site-section",
      label: "A landscape contour and neighboring context, no massing yet",
      layers: [
        groundAxis(),
        {
          id: "site-contour",
          role: "site",
          paths: [{ d: "M60 380 C 200 400, 440 400, 580 370" }],
        },
        {
          id: "context-massing",
          role: "site",
          paths: [{ d: "M460 240 L560 240 L560 380 L460 380 Z", dash: "2 8" }],
        },
      ],
    },
  },
  {
    id: "connect",
    label: "Connect",
    description: "Relationships between people, spaces, and the site take shape as desire lines.",
    plan: {
      id: "process-connect-plan",
      label: "Desire lines connecting loose reference nodes, before a footprint resolves",
      layers: [
        gridAxis(),
        {
          id: "nodes",
          role: "annotation",
          paths: [
            { circle: [220, 200, 5] },
            { circle: [420, 200, 5] },
            { circle: [420, 340, 5] },
            { circle: [220, 340, 5] },
          ],
        },
        {
          id: "desire-lines",
          role: "secondary",
          paths: [
            { line: [220, 200, 420, 200], dash: "2 8" },
            { line: [420, 200, 420, 340], dash: "2 8" },
            { line: [420, 340, 220, 340], dash: "2 8" },
            { line: [220, 340, 220, 200], dash: "2 8" },
          ],
          delayMs: 180,
        },
      ],
    },
    section: {
      id: "process-connect-section",
      label: "Loose level markers linked by tentative connecting lines",
      layers: [
        groundAxis(),
        {
          id: "nodes",
          role: "annotation",
          paths: [{ circle: [260, 380, 4] }, { circle: [260, 220, 4] }],
        },
        {
          id: "desire-line",
          role: "secondary",
          paths: [{ line: [260, 380, 260, 220], dash: "2 8" }],
          delayMs: 180,
        },
      ],
    },
  },
  {
    id: "test",
    label: "Test",
    description: "A tentative footprint is tried against the site and the relationships above.",
    plan: {
      id: "process-test-plan",
      label: "A tentative, lightly drawn footprint tested against the connecting lines",
      layers: [
        gridAxis(),
        {
          id: "site-contours",
          role: "site",
          paths: [{ d: "M60 400 C 180 440, 460 440, 580 380" }],
        },
        {
          id: "tentative-footprint",
          role: "secondary",
          paths: [{ d: "M220 180 L420 180 L420 340 L220 340 Z", dash: "2 8" }],
          delayMs: 180,
        },
        {
          id: "desire-lines",
          role: "annotation",
          paths: [
            { line: [220, 200, 140, 140] },
            { line: [420, 200, 500, 150] },
          ],
          delayMs: 300,
        },
      ],
    },
    section: {
      id: "process-test-section",
      label: "A tentative massing tested against the ground and context",
      layers: [
        groundAxis(),
        {
          id: "site-contour",
          role: "site",
          paths: [{ d: "M60 380 C 200 400, 440 400, 580 370" }],
        },
        {
          id: "tentative-massing",
          role: "secondary",
          paths: [{ d: "M240 200 L400 200 L400 380 L240 380", dash: "2 8" }],
          delayMs: 180,
        },
      ],
    },
  },
  {
    id: "resolve",
    label: "Resolve",
    description: "The footprint firms up into a resolved plan with real partitions.",
    plan: {
      id: "process-resolve-plan",
      label: "A resolved footprint with internal partitions and openings",
      layers: [
        gridAxis(),
        {
          id: "footprint",
          role: "primary",
          paths: [{ d: "M220 180 L420 180 L420 340 L220 340 Z" }],
        },
        {
          id: "partitions",
          role: "secondary",
          paths: [{ line: [220, 260, 420, 260] }, { line: [320, 180, 320, 260] }],
          delayMs: 220,
        },
        {
          id: "dimension",
          role: "annotation",
          paths: [{ line: [210, 180, 210, 340], dash: "2 6" }],
          delayMs: 340,
        },
      ],
    },
    section: {
      id: "process-resolve-section",
      label: "A resolved massing with internal floor levels",
      layers: [
        groundAxis(),
        {
          id: "massing",
          role: "primary",
          paths: [{ d: "M240 190 L400 190 L400 380 L240 380 Z" }],
        },
        {
          id: "floor-levels",
          role: "secondary",
          paths: [{ line: [240, 280, 400, 280] }],
          delayMs: 220,
        },
      ],
    },
  },
  {
    id: "build",
    label: "Build",
    description: "The design resolves into a finished, connected place.",
    plan: {
      id: "process-build-plan",
      label: "The finished plan with one gold connective route completing it",
      layers: [
        gridAxis(),
        {
          id: "site-contours",
          role: "site",
          paths: [{ d: "M60 400 C 180 440, 460 440, 580 380" }],
        },
        {
          id: "footprint",
          role: "primary",
          paths: [{ d: "M220 180 L420 180 L420 340 L220 340 Z" }],
          delayMs: 120,
        },
        {
          id: "partitions",
          role: "secondary",
          paths: [{ line: [220, 260, 420, 260] }, { line: [320, 180, 320, 260] }],
          delayMs: 240,
        },
        {
          id: "connective-accent",
          role: "accent",
          paths: [{ d: "M220 340 L140 400 M420 340 L500 400" }],
          delayMs: 440,
        },
      ],
    },
    section: {
      id: "process-build-section",
      label: "The finished section with a completed gold connective route",
      layers: [
        groundAxis(),
        {
          id: "site-contour",
          role: "site",
          paths: [{ d: "M60 380 C 200 400, 440 400, 580 370" }],
        },
        {
          id: "massing",
          role: "primary",
          paths: [{ d: "M240 190 L400 190 L400 380 L240 380 Z" }],
          delayMs: 120,
        },
        {
          id: "floor-levels",
          role: "secondary",
          paths: [{ line: [240, 280, 400, 280] }],
          delayMs: 240,
        },
        {
          id: "connective-accent",
          role: "accent",
          paths: [{ line: [320, 190, 320, 140] }, { circle: [320, 140, 3] }],
          delayMs: 440,
        },
      ],
    },
  },
];
