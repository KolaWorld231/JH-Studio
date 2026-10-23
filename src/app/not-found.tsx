import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ArchitecturalLines } from "@/components/architectural-lines";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="container-edge py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
            404
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-[var(--color-ink)]">
            This page hasn&apos;t been drawn yet
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-ink-soft)]">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-[var(--color-gold)] transition-colors"
            >
              Back to JH Studio
            </Link>
            <Link
              href="/knitted-architecture/projects"
              className="inline-flex items-center border border-[var(--color-ink)] px-6 py-3 text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
        <div className="relative aspect-square w-full opacity-70" aria-hidden="true">
          <ArchitecturalLines variant="panel" className="w-full h-full" />
        </div>
      </main>
    </>
  );
}
