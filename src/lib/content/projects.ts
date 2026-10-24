export type ProjectStatus = "ongoing" | "completed" | "concept";

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  kind?: "plan" | "elevation" | "section" | "sketch" | "render" | "photo" | "diagram";
};

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  category?: string;
  location?: string;
  year?: string | number;
  coverImage?: ProjectImage;
  summary?: string;
  brief?: string;
  concept?: string;
  designPrinciples?: string[];
  gallery?: ProjectImage[];
  relatedSlugs?: string[];
  /**
   * The signature "blueprint-to-building" sequence from
   * docs/PREMIUM_VISUAL_DIRECTION.md §5: a real plan/elevation that
   * transitions into its corresponding rendering or photograph. Only set
   * this when `drawing` and `rendering` are verified to depict the same
   * project — an explicit pair here, never auto-matched from `gallery` by
   * `kind`, so we never imply an unrelated image is the built result of a
   * plan. Leave it unset (the common case) and the project page simply
   * doesn't render the sequence, per "if no matching final visual exists,
   * do not fabricate one."
   */
  blueprintToBuilding?: {
    drawing: ProjectImage;
    rendering: ProjectImage;
  };
  /**
   * Focused annotations explaining specific design decisions, positioned
   * over `coverImage` by percentage coordinates (0-100). Optional — only
   * set once a project has real drawings worth annotating.
   */
  hotspots?: { x: number; y: number; label: string; body: string }[];
  /**
   * Named plan/section/elevation/model views for the layer-control toggle.
   * Optional — only set when a project has more than one real drawing
   * layer worth switching between.
   */
  layers?: { id: string; label: string; image: ProjectImage }[];
  /**
   * The matched-viewpoint plan-to-photo transition: two anchor points per
   * image (percentage coordinates within each image's own box) defining
   * genuine geometric correspondence, never a generic crossfade. Only set
   * when `drawing` and `photo` are verified to depict the same viewpoint —
   * same never-auto-matched rule as `blueprintToBuilding`.
   */
  matchedViewpoint?: {
    drawing: ProjectImage;
    photo: ProjectImage;
    anchorPoints: { drawing: [[number, number], [number, number]]; photo: [[number, number], [number, number]] };
  };
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  concept: "Concept & Design Study",
};

// No approved project content has been supplied yet. Real projects, with
// verified status, imagery, and copy, belong here as they are approved —
// the portfolio and detail pages are already wired to this array and need
// no further restructuring once entries are added.
export const projects: Project[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByStatus(status?: ProjectStatus): Project[] {
  if (!status) return projects;
  return projects.filter((project) => project.status === status);
}
