/**
 * Fixed intake taxonomy for the Contact brief composer. These are generic,
 * widely-used architecture-practice categories (not a claim that JH Studio
 * offers a specific named service line) plus the five already-approved
 * Knitted Architecture principles — never invented business claims. Keep
 * every option here broad enough to apply honestly to any inquiry, and
 * always include a "not sure yet" escape hatch rather than forcing a
 * premature commitment.
 */

export const projectTypeOptions = ["Residential", "Commercial", "Community / Civic", "Not sure yet"] as const;

export const projectStageOptions = ["Early idea", "Site selected", "Ready to design", "Not sure yet"] as const;

export type ProjectType = (typeof projectTypeOptions)[number];
export type ProjectStage = (typeof projectStageOptions)[number];
