"use client";

import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/hooks/use-reveal";

type RevealOwnProps<T extends ElementType> = {
  children: ReactNode;
  as?: T;
  className?: string;
  delayMs?: number;
  /** "rise" (default) for the standard sitewide entrance; "cinematic" adds
   *  a soft scale, reserved for the one decision-point moment (the
   *  division-selector cards), not used generally. */
  variant?: "rise" | "cinematic";
};

type RevealProps<T extends ElementType> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

export function Reveal<T extends ElementType = "div">({
  children,
  as,
  className = "",
  delayMs = 0,
  variant = "rise",
  style,
  ...rest
}: RevealProps<T> & { style?: CSSProperties }) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, isVisible } = useReveal<HTMLElement>(0.15);
  const baseClass = variant === "cinematic" ? "cinematic-rise" : "fade-rise";

  return (
    <Tag
      ref={ref as never}
      className={`${baseClass} ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delayMs}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
