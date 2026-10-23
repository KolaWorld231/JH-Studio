"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/hooks/use-reveal";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delayMs?: number;
};

export function Reveal({ children, as: Tag = "div", className = "", delayMs = 0 }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLElement>(0.15);

  return (
    <Tag
      ref={ref as never}
      className={`fade-rise ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </Tag>
  );
}
