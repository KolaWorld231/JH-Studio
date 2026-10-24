import { Reveal } from "@/components/reveal";
import { SchematicCornerBackdrop } from "@/components/drawing/schematic-corner-backdrop";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden container-edge pt-16 pb-12 md:pt-24 md:pb-16 border-b border-[var(--color-border)]">
      <SchematicCornerBackdrop />
      <Reveal className="relative">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-[var(--color-ink)] max-w-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
            {description}
          </p>
        ) : null}
      </Reveal>
    </div>
  );
}
