export type Principle = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export const principles: Principle[] = [
  {
    id: "knit-people",
    index: "01",
    title: "Knit People",
    description:
      "Create opportunities for human interaction and shared experience.",
  },
  {
    id: "knit-spaces",
    index: "02",
    title: "Knit Spaces",
    description:
      "Connect spaces through transitions, visual relationships, and shared circulation.",
  },
  {
    id: "knit-architecture-nature",
    index: "03",
    title: "Knit Architecture + Nature",
    description: "Integrate nature from the beginning of the design process.",
  },
  {
    id: "knit-context",
    index: "04",
    title: "Knit Context",
    description:
      "Respond to culture, climate, movement, surrounding buildings, landscape, local materials, community patterns, and economic realities.",
  },
  {
    id: "knit-movement-function",
    index: "05",
    title: "Knit Movement & Function",
    description:
      "Shape movement and relationships between functions to create connected environments.",
  },
];
