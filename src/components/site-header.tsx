import Link from "next/link";
import { Logo } from "@/components/logo";
import { MobileMenu } from "@/components/mobile-menu";

type SiteHeaderProps = {
  /** Shown next to the logo to orient visitors inside a division. */
  divisionLabel?: string;
};

export function SiteHeader({ divisionLabel }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-paper)]/90 backdrop-blur border-b border-[var(--color-border)] relative">
      <div className="container-edge flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-3">
          <Logo />
          {divisionLabel ? (
            <>
              <span className="hidden sm:inline text-[var(--color-border)]" aria-hidden="true">
                /
              </span>
              <span className="hidden sm:inline text-sm uppercase tracking-[0.12em] text-[var(--color-muted)]">
                {divisionLabel}
              </span>
            </>
          ) : null}
        </div>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm">
          <Link
            href="/knitted-architecture"
            className="hidden md:inline text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
          >
            Knitted Architecture
          </Link>
          <Link
            href="/real-estate-development"
            className="hidden md:inline text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
          >
            Real Estate Development
          </Link>
          <Link
            href="/knitted-architecture/contact"
            className="hidden sm:inline-flex items-center border border-[var(--color-ink)] px-4 py-2 text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          >
            Contact
          </Link>
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}
