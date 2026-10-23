import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content/projects";
import { projectStatusLabels } from "@/lib/content/projects";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  /** "feature" is used by the asymmetric portfolio grid for wider, taller tiles. */
  size?: "standard" | "feature";
};

export function ProjectCard({ project, priority = false, size = "standard" }: ProjectCardProps) {
  const isFeature = size === "feature";

  return (
    <Link
      href={`/knitted-architecture/projects/${project.slug}`}
      className="group block border border-[var(--color-border)] bg-[var(--color-paper)] transition-colors hover:border-[var(--color-gold)]"
    >
      <div
        className={`relative bg-[var(--color-surface)] overflow-hidden ${
          isFeature ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes={
              isFeature
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Image pending
          </div>
        )}
      </div>
      <div className={isFeature ? "p-6 md:p-8" : "p-5"}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.12em] text-[var(--color-gold-dim)]">
            {projectStatusLabels[project.status]}
          </span>
          {project.year ? (
            <span className="text-xs text-[var(--color-muted)]">{project.year}</span>
          ) : null}
        </div>
        <h3
          className={`mt-2 font-display text-[var(--color-ink)] ${
            isFeature ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        <p className={`mt-1 text-[var(--color-muted)] ${isFeature ? "text-base" : "text-sm"}`}>
          {[project.category, project.location].filter(Boolean).join(" · ")}
        </p>
        {isFeature && project.summary ? (
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-ink-soft)]">
            {project.summary}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
