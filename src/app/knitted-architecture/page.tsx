import Link from "next/link";
import type { Metadata } from "next";
import { ArchitecturalLines } from "@/components/architectural-lines";
import { Reveal } from "@/components/reveal";
import { PrincipleCardLink } from "@/components/principle-card-link";
import { siteContent } from "@/lib/content/site";
import { principles } from "@/lib/content/principles";
import { projects } from "@/lib/content/projects";
import { ProjectCard } from "@/components/project-card";
import { EmptyState } from "@/components/empty-state";

export const metadata: Metadata = {
  title: "Knitted Architecture",
  description:
    "Architecture that connects — JH Studio's Knitted Architecture practice weaves people, spaces, nature, culture, and movement into cohesive environments.",
};

export default function KnittedArchitecturePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="container-edge grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 md:py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
              Knitted Architecture
            </p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-[1.08] text-[var(--color-ink)]">
              {siteContent.tagline}
            </h1>
            <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {siteContent.coreIdea} {siteContent.practiceStatement}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/knitted-architecture/projects"
                className="inline-flex items-center bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-[var(--color-gold)] transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="/knitted-architecture/philosophy"
                className="inline-flex items-center border border-[var(--color-ink)] px-6 py-3 text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
              >
                Our Philosophy
              </Link>
            </div>
          </Reveal>
          <div className="relative aspect-[4/3] w-full" aria-hidden="true">
            <ArchitecturalLines className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* Five principles, condensed */}
      <section className="container-edge py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
            Five Principles
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--color-ink)]">
            How we knit people, place, and nature together
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          {principles.map((principle, i) => (
            <PrincipleCardLink key={principle.id} principle={principle} delayMs={i * 60} />
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/knitted-architecture/philosophy"
            className="text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-gold)]"
          >
            Read the full philosophy →
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="container-edge py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
                Selected Work
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--color-ink)]">
                Projects
              </h2>
            </Reveal>
            <Link
              href="/knitted-architecture/projects"
              className="text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-gold)]"
            >
              View all projects →
            </Link>
          </div>

          <div className="mt-12">
            {featured.length === 0 ? (
              <EmptyState
                title="Project work is on the way"
                description="JH Studio's ongoing, completed, and concept projects will appear here as they are approved for publication."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} priority={i === 0} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
