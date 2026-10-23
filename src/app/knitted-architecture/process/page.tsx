import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ProcessPrinciplePanel } from "@/components/process-principle-panel";
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

      <ProcessPrinciplePanel principles={principles} />

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
