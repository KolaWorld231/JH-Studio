import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ProcessStepper } from "@/components/process-stepper";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { processPerspectiveScene } from "@/lib/drawing/scenes";
import { siteContent } from "@/lib/content/site";

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

      <section className="container-edge py-16 md:py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">Six Stages</p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl text-[var(--color-ink)] max-w-2xl">
            One project, developing in stages — select a stage to see how the plan and section resolve.
          </h2>
        </Reveal>
        <Reveal delayMs={80} className="mt-10">
          <ProcessStepper />
        </Reveal>
      </section>

      {/* A dedicated visual breather between the principle panel and the
          closing note — a contained drawing area with its own whitespace,
          not competing with any heading or paragraph. */}
      <section className="container-edge py-16 md:py-20">
        <Reveal className="mx-auto max-w-2xl aspect-[4/3]">
          <ArchitecturalDrawing
            scene={processPerspectiveScene}
            mode="progress"
            ambient
            showCaption
            className="h-full w-full"
          />
        </Reveal>
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
