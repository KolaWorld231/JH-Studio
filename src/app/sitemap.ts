import type { MetadataRoute } from "next";
import { projects } from "@/lib/content/projects";

// Required for `output: "export"` (static hosting, e.g. GitHub Pages) —
// this route has no dynamic input, so it's always statically renderable.
export const dynamic = "force-static";

// Set NEXT_PUBLIC_SITE_URL once the site has a real production domain.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

const staticRoutes = [
  "/",
  "/knitted-architecture",
  "/knitted-architecture/philosophy",
  "/knitted-architecture/projects",
  "/knitted-architecture/process",
  "/knitted-architecture/studio",
  "/knitted-architecture/contact",
  "/real-estate-development",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPaths = projects.map((project) => `/knitted-architecture/projects/${project.slug}`);

  return [...staticRoutes, ...projectPaths].map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
