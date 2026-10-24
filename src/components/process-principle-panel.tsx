"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { processScene, principleScenes } from "@/lib/drawing/scenes";
import type { Principle } from "@/lib/content/principles";

/**
 * The process intro text + five-principle list, paired with a single
 * drawing panel that swaps to that principle's own diagram on hover/focus —
 * a literal version of "hovering over a principle highlights its
 * corresponding architectural relationship." Falls back to the general
 * process scene (scroll-reactive) when nothing is focused.
 */
export function ProcessPrinciplePanel({ principles }: { principles: Principle[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeScene = (activeId && principleScenes[activeId]) || null;

  return (
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
            <li key={principle.id}>
              <Link
                href={`/knitted-architecture/philosophy#${principle.id}`}
                onMouseEnter={() => setActiveId(principle.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(principle.id)}
                onBlur={() => setActiveId(null)}
                className="group flex items-baseline gap-3 text-sm"
              >
                <span className="font-display text-[var(--color-gold-dim)]">{principle.index}</span>
                <span className="text-[var(--color-ink)] group-hover:text-[var(--color-gold-dim)] transition-colors">
                  {principle.title}
                </span>
              </Link>
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
        {/* The default process scene stays mounted and scroll-reactive; the
            active principle scene crossfades over it on hover/focus (never a
            hard cut) so swapping never interrupts the base scroll-progress
            animation underneath, and resolves quickly (600ms, no grid)
            rather than replaying the full cinematic draw on every hover. */}
        <div className="absolute inset-0">
          <ArchitecturalDrawing scene={processScene} mode="progress" />
        </div>
        <div
          className={`absolute inset-0 bg-[var(--color-paper)] transition-opacity duration-[400ms] ${
            activeScene ? "opacity-100" : "opacity-0"
          }`}
        >
          {activeScene ? (
            <ArchitecturalDrawing
              key={activeScene.id}
              scene={activeScene}
              mode="reveal"
              highlighted
              showGrid={false}
              durationMs={600}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
