"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)] px-6">
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">
          Something went wrong
        </p>
        <h1 className="mt-4 font-display text-3xl text-[var(--color-ink)]">
          This page ran into a problem
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          Please try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-[var(--color-gold)] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center border border-[var(--color-ink)] px-6 py-3 text-sm uppercase tracking-[0.08em] text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
          >
            Back to JH Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
