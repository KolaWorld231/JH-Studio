import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProjectBySlug,
  projects,
  projectStatusLabels,
} from "@/lib/content/projects";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { AppImage } from "@/components/app-image";
import { BlueprintToBuilding } from "@/components/blueprint-to-building";
import { ProjectGallery } from "@/components/project-gallery";

export function generateStaticParams() {
  if (projects.length === 0) {
    // `output: "export"` (static hosting, e.g. GitHub Pages) requires at
    // least one generated path for a dynamic route. This placeholder slug
    // matches no real project, so getProjectBySlug() below returns
    // undefined and the page renders as the standard not-found page — it's
    // not a fabricated project, just a build-time placeholder. Remove this
    // branch's relevance once real projects exist (it naturally stops
    // being used as soon as `projects` is non-empty).
    return [{ slug: "_placeholder" }];
  }
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/knitted-architecture/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary ?? `${project.title} — a JH Studio Knitted Architecture project.`,
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/knitted-architecture/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = (project.relatedSlugs ?? [])
    .map((relatedSlug) => getProjectBySlug(relatedSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const metaLine = [
    project.category,
    project.location,
    project.year ? String(project.year) : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <div className="container-edge pt-10">
        <Link
          href="/knitted-architecture/projects"
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← All projects
        </Link>
      </div>

      <div className="container-edge pt-6 pb-10 md:pb-14 border-b border-[var(--color-border)]">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold-dim)]">
            {projectStatusLabels[project.status]}
          </span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-[var(--color-ink)] max-w-3xl">
            {project.title}
          </h1>
          {metaLine ? <p className="mt-3 text-[var(--color-muted)]">{metaLine}</p> : null}
          {project.summary ? (
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {project.summary}
            </p>
          ) : null}
        </Reveal>
      </div>

      {project.blueprintToBuilding ? (
        <div className="container-edge py-10 md:py-14">
          <Reveal className="mb-4 block">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold-dim)]">
              Blueprint to Building
            </p>
          </Reveal>
          <BlueprintToBuilding
            drawing={project.blueprintToBuilding.drawing}
            rendering={project.blueprintToBuilding.rendering}
          />
        </div>
      ) : project.coverImage ? (
        <div className="container-edge py-10 md:py-14">
          <div className="relative aspect-[16/9] w-full bg-[var(--color-surface)]">
            <AppImage
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          {project.coverImage.caption ? (
            <p className="mt-3 text-sm text-[var(--color-muted)]">{project.coverImage.caption}</p>
          ) : null}
        </div>
      ) : null}

      {project.brief || project.concept ? (
        <div className="container-edge py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-[var(--color-border)]">
          {project.brief ? (
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
                Design Brief
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">{project.brief}</p>
            </Reveal>
          ) : null}
          {project.concept ? (
            <Reveal delayMs={80}>
              <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
                Design Concept
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">{project.concept}</p>
            </Reveal>
          ) : null}
        </div>
      ) : null}

      {project.gallery && project.gallery.length > 0 ? (
        <div className="container-edge py-10 md:py-14 border-t border-[var(--color-border)]">
          <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)] mb-6">
            Drawings & Imagery
          </h2>
          <ProjectGallery images={project.gallery} />
        </div>
      ) : null}

      {project.designPrinciples && project.designPrinciples.length > 0 ? (
        <div className="container-edge py-10 md:py-14 border-t border-[var(--color-border)]">
          <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4">
            Relevant Principles
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.designPrinciples.map((principle) => (
              <span
                key={principle}
                className="border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-soft)]"
              >
                {principle}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {related.length > 0 ? (
        <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="container-edge py-14 md:py-20">
            <h2 className="font-display text-2xl text-[var(--color-ink)] mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((relatedProject) => (
                <ProjectCard key={relatedProject.slug} project={relatedProject} />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="container-edge py-16 md:py-20 text-center border-t border-[var(--color-border)]">
        <p className="font-display text-2xl text-[var(--color-ink)]">
          Interested in a project like this?
        </p>
        <Link
          href="/knitted-architecture/contact"
          className="mt-6 inline-flex items-center bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-[var(--color-gold)] transition-colors"
        >
          Start a Conversation
        </Link>
      </div>
    </>
  );
}
