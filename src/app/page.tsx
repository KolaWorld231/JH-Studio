import { SiteHeader } from "@/components/site-header";
import { ArchitecturalLines } from "@/components/architectural-lines";
import { DivisionCard } from "@/components/division-card";
import { Reveal } from "@/components/reveal";
import { SignatureScene } from "@/components/drawing/signature-scene";
import { siteContent, divisions } from "@/lib/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JH Studio Design & Development",
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        {/* The entire first screen: a brief introduction resolving directly
            into the division choice, so a visitor is never more than one
            glance from "Knitted Architecture" or "Real Estate Development" —
            nothing else competes with that decision above the fold. */}
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-[var(--color-border)] py-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden="true"
          >
            <ArchitecturalLines className="h-full w-full" />
          </div>

          <div className="container-edge relative">
            <Reveal className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
                {siteContent.parentFullName}
              </p>
              <h1 className="mt-4 font-display text-4xl md:text-5xl leading-[1.08] text-[var(--color-ink)]">
                {siteContent.tagline}
              </h1>
              <p className="mt-5 max-w-lg text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
                {siteContent.heroLine}
              </p>
            </Reveal>

            <Reveal delayMs={100} className="mt-14 md:mt-16 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
                Two Divisions
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--color-ink)]">
                Choose a path into JH Studio
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Reveal variant="cinematic" delayMs={200}>
                <DivisionCard
                  href={divisions.knittedArchitecture.href}
                  overlayColor="var(--color-paper)"
                  className="group relative flex h-full flex-col justify-between overflow-hidden border border-[var(--color-border)] bg-[var(--color-paper)] p-8 md:p-10 transition-colors hover:border-[var(--color-gold)]"
                >
                  <div className="absolute inset-0 opacity-[0.35] pointer-events-none" aria-hidden="true">
                    <ArchitecturalLines variant="panel" className="w-full h-full" />
                  </div>
                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold-dim)]">
                      {divisions.knittedArchitecture.status === "available"
                        ? "Available now"
                        : "Coming Soon"}
                    </p>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl text-[var(--color-ink)]">
                      {divisions.knittedArchitecture.name}
                    </h3>
                    <p className="mt-2 italic text-[var(--color-ink-soft)]">
                      {divisions.knittedArchitecture.tagline}
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
                      {divisions.knittedArchitecture.description}
                    </p>
                  </div>
                  <span className="relative mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.08em] text-[var(--color-ink)]">
                    Enter the division
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </DivisionCard>
              </Reveal>

              <Reveal variant="cinematic" delayMs={320}>
                <DivisionCard
                  href={divisions.realEstateDevelopment.href}
                  overlayColor="var(--color-night)"
                  className="group relative flex h-full flex-col justify-between overflow-hidden border border-[var(--color-border)] bg-[var(--color-night)] text-[var(--color-night-ink)] p-8 md:p-10 transition-colors hover:border-[var(--color-gold)]"
                >
                  <div className="absolute inset-0 opacity-[0.25] pointer-events-none" aria-hidden="true">
                    <ArchitecturalLines variant="panel" tone="paper" className="w-full h-full" />
                  </div>
                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]">
                      {divisions.realEstateDevelopment.status === "available"
                        ? "Available now"
                        : "Coming Soon"}
                    </p>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl">
                      {divisions.realEstateDevelopment.name}
                    </h3>
                    <p className="mt-2 italic text-[var(--color-night-muted)]">
                      {divisions.realEstateDevelopment.tagline}
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-night-muted)]">
                      {divisions.realEstateDevelopment.description}
                    </p>
                  </div>
                  <span className="relative mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.08em]">
                    Learn more
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </DivisionCard>
              </Reveal>
            </div>
          </div>
        </section>

        <SignatureScene />
      </main>
    </>
  );
}
