import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ArchitecturalLines } from "@/components/architectural-lines";
import { Reveal } from "@/components/reveal";
import { divisions, siteContent } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Real Estate Development",
  description: "JH Studio's Real Estate Development division — coming soon.",
};

export default function RealEstateDevelopmentPage() {
  const division = divisions.realEstateDevelopment;

  return (
    <>
      <SiteHeader divisionLabel="Real Estate Development" />
      <main id="main-content" className="bg-[var(--color-night)] text-[var(--color-night-ink)] min-h-[70vh]">
        <div className="container-edge py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">
              {division.name}
              {division.status === "coming-soon" ? " · Coming Soon" : ""}
            </p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-[1.08]">
              {division.tagline}
            </h1>
            <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-[var(--color-night-muted)]">
              {siteContent.valueProposition}
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-night-muted)]">
              Real Estate Development is a real JH Studio division, shaped by
              the same philosophy as Knitted Architecture. Its projects,
              approach, and opportunities are not yet published — nothing
              shown here should be read as an active investment opportunity
              or portfolio.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/knitted-architecture/contact"
                className="inline-flex items-center border border-[var(--color-night-ink)] px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:text-[var(--color-night)] transition-colors"
              >
                Contact JH Studio
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 text-sm uppercase tracking-[0.08em] text-[var(--color-night-muted)] hover:text-[var(--color-night-ink)] transition-colors"
              >
                ← Back to JH Studio
              </Link>
            </div>
          </Reveal>
          <div className="relative aspect-[4/3] w-full opacity-70" aria-hidden="true">
            <ArchitecturalLines tone="paper" className="w-full h-full" />
          </div>
        </div>
      </main>
    </>
  );
}
