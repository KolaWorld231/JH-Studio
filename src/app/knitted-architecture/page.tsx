import Link from "next/link";
import type { Metadata } from "next";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { kaHeroScene } from "@/lib/drawing/scenes";
import { Reveal } from "@/components/reveal";
import { PrincipleCardLink } from "@/components/principle-card-link";
import { siteContent } from "@/lib/content/site";
import { principles } from "@/lib/content/principles";
import { projects } from "@/lib/content/projects";
import { ProjectCard } from "@/components/project-card";
import { EmptyState } from "@/components/empty-state";
import { DrawingBackdrop } from "@/components/drawing/drawing-backdrop";
import { roofStudyScene } from "@/lib/drawing/reference-scenes";
import { KaActsContainer, KaGoldThread } from "@/components/ka-gold-thread";

export const metadata: Metadata = {
  title: "Knitted Architecture",
  description:
    "Architecture that connects — JH Studio's Knitted Architecture practice weaves people, spaces, nature, culture, and movement into cohesive environments.",
};

function ActLabel({ index, title }: { index: string; title: string }) {
  return (
    <p className="annotation-text text-[var(--color-gold-dim)]">
      {index} — {title}
    </p>
  );
}

export default function KnittedArchitecturePage() {
  const featured = projects.slice(0, 3);

  return (
    <KaActsContainer className="grid-editorial relative">
      <KaGoldThread />

      <div style={{ gridColumn: "2 / -1" }}>
      {/* Act One: Draw — the idea, as a line */}
      <section className="border-b border-[var(--color-border)] py-16 md:py-24">
        <ActLabel index="01" title="Draw" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.08] text-[var(--color-ink)]">
              {siteContent.tagline}
            </h1>
            <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {siteContent.coreIdea} {siteContent.practiceStatement}
            </p>
          </Reveal>
          <div className="relative aspect-[4/3] w-full">
            <ArchitecturalDrawing
              scene={kaHeroScene}
              mode="progress"
              ambient
              interactive
              showCaption
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Act Two: Connect — the line becomes principles */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] py-20 md:py-28">
        <DrawingBackdrop scene={roofStudyScene} ambient />
        <div className="relative z-10">
          <ActLabel index="02" title="Connect" />
          <Reveal className="mt-4 max-w-2xl block">
            <h2 className="font-display text-3xl md:text-4xl text-[var(--color-ink)]">
              How we knit people, place, and nature together
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
            {principles.map((principle, i) => (
              <PrincipleCardLink
                key={principle.id}
                principle={principle}
                delayMs={i * 60}
                // 5 items into a 2-column tablet grid leaves an empty, oddly
                // bordered cell next to the last card — span it full-width at
                // that breakpoint only; the 5-column desktop grid is unaffected.
                className={i === principles.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}
              />
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
        </div>
      </section>

      {/* Act Three: Inhabit — the spaces people use */}
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)] py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <ActLabel index="03" title="Inhabit" />
            <Reveal className="mt-4 block">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--color-ink)]">
                Projects
              </h2>
            </Reveal>
          </div>
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
      </section>

      {/* Act Four: Enter — step into the practice */}
      <section className="py-20 md:py-28 text-center">
        <ActLabel index="04" title="Enter" />
        <Reveal className="mt-4 block">
          <h2 className="font-display text-2xl md:text-3xl text-[var(--color-ink)]">
            Start where you are — a philosophy, a project, a conversation.
          </h2>
        </Reveal>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/knitted-architecture/philosophy"
            className="inline-flex items-center border border-[var(--color-ink)] px-6 py-3 text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
          >
            Our Philosophy
          </Link>
          <Link
            href="/knitted-architecture/projects"
            className="inline-flex items-center border border-[var(--color-ink)] px-6 py-3 text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/knitted-architecture/contact"
            className="inline-flex items-center bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-[var(--color-gold)] transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
      </div>
    </KaActsContainer>
  );
}
