import { AppImage } from "@/components/app-image";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { cardAccentScene } from "@/lib/drawing/scenes";
import type { TeamMember } from "@/lib/content/team";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group border border-[var(--color-border)] bg-[var(--color-paper)] transition-colors hover:border-[var(--color-gold)]">
      <div className="relative aspect-[4/5] bg-[var(--color-surface)] overflow-hidden">
        {member.portrait ? (
          <AppImage
            src={member.portrait}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Portrait pending
          </div>
        )}
        {/* Same quiet corner accent used on project cards, kept consistent
            across the site rather than invented separately per component. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-12 w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-70 group-focus-within:opacity-70"
        >
          <ArchitecturalDrawing scene={cardAccentScene} viewBox="0 0 48 48" durationMs={600} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-[var(--color-ink)]">{member.name}</h3>
        <p className="text-sm text-[var(--color-gold-dim)]">{member.role}</p>
        {member.bio ? (
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{member.bio}</p>
        ) : null}
        {member.links && member.links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {member.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-soft)] underline underline-offset-4 hover:text-[var(--color-gold)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
