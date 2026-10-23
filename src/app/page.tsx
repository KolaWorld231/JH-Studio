import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ArchitecturalLines } from "@/components/architectural-lines";
import { Reveal } from "@/components/reveal";
import { siteContent, divisions } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "JH Studio Design & Development",
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--color-border)]">
          <div className="container-edge grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 md:py-28">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
                {siteContent.parentFullName}
              </p>
              <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05] text-[var(--color-ink)]">
                {siteContent.tagline}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-ink-soft)]">
                {siteContent.heroLine}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/knitted-architecture"
                  className="inline-flex items-center bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-[var(--color-gold)] transition-colors"
                >
                  Enter Knitted Architecture
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center border border-[var(--color-ink)] px-6 py-3 text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
                >
                  About JH Studio
                </Link>
              </div>
            </Reveal>
            <div className="relative aspect-[4/3] w-full" aria-hidden="true">
              <ArchitecturalLines className="w-full h-full" />
            </div>
          </div>
        </section>

        {/* About / purpose */}
        <section id="about" className="container-edge py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
              Our Purpose
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--color-ink)]">
              {siteContent.coreIdea}
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {siteContent.practiceStatement}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
            <Reveal delayMs={80} className="border-t border-[var(--color-border)] pt-6">
              <h3 className="text-sm uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Vision
              </h3>
              <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">
                {siteContent.vision}
              </p>
            </Reveal>
            <Reveal delayMs={160} className="border-t border-[var(--color-border)] pt-6">
              <h3 className="text-sm uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Mission
              </h3>
              <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">
                {siteContent.mission}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Division selector */}
        <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="container-edge py-20 md:py-28">
            <Reveal className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
                Two Divisions
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--color-ink)]">
                Choose a path into JH Studio
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal delayMs={80}>
                <Link
                  href={divisions.knittedArchitecture.href}
                  className="group relative flex h-full flex-col justify-between overflow-hidden border border-[var(--color-border)] bg-[var(--color-paper)] p-8 md:p-10 transition-colors hover:border-[var(--color-gold)]"
                >
                  <div className="absolute inset-0 opacity-[0.35] pointer-events-none">
                    <ArchitecturalLines variant="panel" className="w-full h-full" />
                  </div>
                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold-dim)]">
                      Available now
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
                </Link>
              </Reveal>

              <Reveal delayMs={160}>
                <Link
                  href={divisions.realEstateDevelopment.href}
                  className="group relative flex h-full flex-col justify-between overflow-hidden border border-[var(--color-border)] bg-[var(--color-night)] text-[var(--color-night-ink)] p-8 md:p-10 transition-colors hover:border-[var(--color-gold)]"
                >
                  <div className="absolute inset-0 opacity-[0.25] pointer-events-none">
                    <ArchitecturalLines variant="panel" tone="paper" className="w-full h-full" />
                  </div>
                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]">
                      Coming Soon
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
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
