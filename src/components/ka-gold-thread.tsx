"use client";

import { type ReactNode } from "react";
import { usePageScrollProgress } from "@/lib/hooks/use-page-scroll-progress";

/**
 * The only client boundary the KA homepage's four acts need: tracks scroll
 * progress across the whole acts section and exposes it as --scroll-progress
 * on this wrapper, which KaGoldThread (and nothing else) reads. Everything
 * passed as `children` is ordinary server-rendered content.
 */
export function KaActsContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = usePageScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * A persistent gold line marking progress through the four acts
 * (Draw/Connect/Inhabit/Enter). Placed as a grid item in .grid-editorial's
 * own column 1 (`grid-column: 1 / 2`) — a layout-level guarantee it never
 * sits behind body copy, which lives in the sibling content cell at
 * columns 2+. It shares that single grid row with the content cell, so its
 * default `align-items: stretch` makes it exactly as tall as all four acts
 * combined, with no explicit row count to keep in sync. Hidden below the
 * 12-col breakpoint, where there is no outer gutter to put it in.
 */
export function KaGoldThread() {
  return (
    <div aria-hidden="true" className="relative hidden lg:block" style={{ gridColumn: "1 / 2" }}>
      <svg
        viewBox="0 0 10 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <line x1="5" y1="0" x2="5" y2="100" stroke="var(--color-border)" strokeWidth="0.5" />
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="100"
          stroke="var(--color-gold)"
          strokeWidth="1"
          pathLength="100"
          style={{
            strokeDasharray: "100",
            strokeDashoffset: "calc(100 - (100 * var(--scroll-progress, 0)))",
          }}
        />
      </svg>
    </div>
  );
}
