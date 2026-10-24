import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ArchitecturalLines } from "@/components/architectural-lines";
import { PrincipleRow } from "@/components/principle-row";
import { siteContent } from "@/lib/content/site";
import { principles } from "@/lib/content/principles";
import { principleScenes } from "@/lib/drawing/scenes";

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
          <ArchitecturalLines variant="panel" className="w-full h-full" />
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="container-edge py-16 md:py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
              The Five Principles
            </p>
          </Reveal>

          <ol className="mt-10 space-y-10">
            {principles.map((principle, i) => (
              <PrincipleRow
                key={principle.id}
                principle={principle}
                scene={principleScenes[principle.id]}
                delayMs={i * 70}
              />
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
