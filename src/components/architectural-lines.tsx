import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { defaultScene } from "@/lib/drawing/scenes";

type ArchitecturalLinesProps = {
  variant?: "hero" | "panel" | "divider";
  tone?: "ink" | "paper";
  className?: string;
};

/**
 * The original JH Studio line-drawing motif. Kept as a thin, stable wrapper
 * around the Reactive Architectural Drawing System's `defaultScene` so every
 * existing usage (parent homepage, Real Estate Development, 404) keeps its
 * exact prior appearance and behavior without changes at the call site.
 */
export function ArchitecturalLines({ variant = "hero", tone = "ink", className = "" }: ArchitecturalLinesProps) {
  return (
    <ArchitecturalDrawing
      scene={defaultScene}
      tone={tone}
      className={className}
      showCaption={variant === "hero"}
    />
  );
}
