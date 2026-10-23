import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content/projects";
import { projectStatusLabels } from "@/lib/content/projects";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/knitted-architecture/projects/${project.slug}`}
      className="group block border border-[var(--color-border)] bg-[var(--color-paper)] transition-colors hover:border-[var(--color-gold)]"
    >
      <div className="relative aspect-[4/3] bg-[var(--color-surface)] overflow-hidden">
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Image pending
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.12em] text-[var(--color-gold-dim)]">
            {projectStatusLabels[project.status]}
          </span>
          {project.year ? (
            <span className="text-xs text-[var(--color-muted)]">{project.year}</span>
          ) : null}
        </div>
        <h3 className="mt-2 font-display text-lg text-[var(--color-ink)]">{project.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          {[project.category, project.location].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
