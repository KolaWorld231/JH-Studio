"use client";

import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/hooks/use-reveal";

type RevealOwnProps<T extends ElementType> = {
  children: ReactNode;
  as?: T;
  className?: string;
  delayMs?: number;
};

type RevealProps<T extends ElementType> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

export function Reveal<T extends ElementType = "div">({
  children,
  as,
  className = "",
  delayMs = 0,
  style,
  ...rest
}: RevealProps<T> & { style?: CSSProperties }) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, isVisible } = useReveal<HTMLElement>(0.15);

  return (
    <Tag
      ref={ref as never}
      className={`fade-rise ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delayMs}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
