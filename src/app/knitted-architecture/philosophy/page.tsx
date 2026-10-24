import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { urbanPerspectiveScene } from "@/lib/drawing/reference-scenes";
import { PrincipleRow } from "@/components/principle-row";
import { PhilosophyModel } from "@/components/philosophy-model";
import { siteContent } from "@/lib/content/site";
import { principles } from "@/lib/content/principles";

export const metadata: Metadata = {
  title: "Philosophy",
  description:
    "The five principles of Knitted Architecture: how JH Studio knits people, spaces, nature, context, and movement together.",
};

export default function PhilosophyPage() {
  return (
    <>
      <PageHero
        eyebrow="Philosophy"
        title="Architecture should not stand apart from the people and places it serves."
        description="It should connect them. Knitted Architecture is JH Studio's approach to weaving people, spaces, nature, culture, and movement into cohesive environments."
      />

      <section className="container-edge py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <Reveal className="max-w-3xl">
          <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
            {siteContent.practiceStatement}
          </p>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
            {siteContent.valueProposition}
          </p>
        </Reveal>
        <div className="relative aspect-square w-full hidden lg:block" aria-hidden="true">
          <ArchitecturalDrawing
            scene={urbanPerspectiveScene}
            mode="progress"
            ambient
            showCaption
            showGrid={false}
            className="h-full w-full"
          />
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="container-edge py-16 md:py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
              The Five Principles
            </p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl text-[var(--color-ink)] max-w-2xl">
              One model, reorganized by each principle — select one to see how it reshapes the same plan and
              section.
            </h2>
          </Reveal>

          <Reveal delayMs={80} className="mt-10">
            <PhilosophyModel principles={principles} />
          </Reveal>
        </div>
      </section>

      <section className="container-edge py-16 md:py-20">
        <ol className="space-y-10">
          {principles.map((principle, i) => (
            <PrincipleRow key={principle.id} principle={principle} delayMs={i * 70} />
          ))}
        </ol>
      </section>
    </>
  );
}
