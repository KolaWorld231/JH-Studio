import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ArchitecturalLines } from "@/components/architectural-lines";
import { siteContent } from "@/lib/content/site";
import { principles } from "@/lib/content/principles";

export const metadata: Metadata = {
  title: "Process",
  description: "How JH Studio approaches design: grounded in the five principles of Knitted Architecture.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="A design approach grounded in connection"
        description={siteContent.valueProposition}
      />

      <section className="container-edge py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
            Every JH Studio project is shaped by the same working method: the five
            principles of Knitted Architecture are applied from the first
            conversation about a site through to the completed, lived-in place.
            They guide how we read a context, test a concept, and develop a
            design into a building that performs for its people.
          </p>
          <ul className="mt-8 space-y-3">
            {principles.map((principle) => (
              <li key={principle.id} className="flex items-baseline gap-3 text-sm">
                <span className="font-display text-[var(--color-gold-dim)]">{principle.index}</span>
                <span className="text-[var(--color-ink)]">{principle.title}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/knitted-architecture/philosophy"
            className="mt-6 inline-block text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-gold)]"
          >
            Read the full philosophy →
          </Link>
        </Reveal>
        <div className="relative aspect-square w-full" aria-hidden="true">
          <ArchitecturalLines variant="panel" className="w-full h-full" />
        </div>
      </section>

      <section className="container-edge pb-16 md:pb-24">
        <Reveal className="border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center max-w-2xl mx-auto">
          <p className="font-display text-xl text-[var(--color-ink)]">
            A detailed, phase-by-phase process walkthrough is in development
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            We&apos;ll publish it here once it reflects how JH Studio actually works with
            clients, rather than a generic template.
          </p>
        </Reveal>
      </section>
    </>
  );
}
