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
