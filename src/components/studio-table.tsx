import { AppImage } from "@/components/app-image";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { cardAccentScene } from "@/lib/drawing/scenes";
import type { TeamMember } from "@/lib/content/team";

/**
 * An editorial row-based studio listing, replacing the generic card grid —
 * still fully data-driven off `team: TeamMember[]`, same optional fields
 * (portrait/bio/links), same corner-accent treatment project/team cards
 * already share for consistency.
 */
export function StudioTable({ team }: { team: TeamMember[] }) {
  return (
    <ul className="divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)]">
      {team.map((member) => (
        <li key={member.id} className="group grid grid-cols-[5rem_1fr] md:grid-cols-[7rem_1fr_1fr] gap-6 py-8">
          <div className="relative aspect-square w-20 md:w-28 bg-[var(--color-surface)] overflow-hidden">
            {member.portrait ? (
              <AppImage src={member.portrait} alt={member.name} fill sizes="112px" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                Portrait pending
              </div>
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-70 group-focus-within:opacity-70"
            >
              <ArchitecturalDrawing scene={cardAccentScene} viewBox="0 0 48 48" durationMs={600} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl text-[var(--color-ink)]">{member.name}</h3>
            <p className="mt-1 text-sm text-[var(--color-gold-dim)]">{member.role}</p>
            {member.links && member.links.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-3">
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

          {member.bio ? (
            <p className="md:col-start-3 text-sm leading-relaxed text-[var(--color-muted)]">{member.bio}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
