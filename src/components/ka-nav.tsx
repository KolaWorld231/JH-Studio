"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { kaNavLinks } from "@/lib/content/nav";

export function KaNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Knitted Architecture"
      className="border-b border-[var(--color-border)] bg-[var(--color-paper)]"
    >
      <div className="container-edge flex items-center gap-1 overflow-x-auto text-sm">
        {kaNavLinks.map((link) => {
          const isActive =
            link.href === "/knitted-architecture"
              ? pathname === link.href
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative whitespace-nowrap px-4 py-3 transition-colors ${
                isActive
                  ? "text-[var(--color-ink)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {link.label}
              {isActive ? (
                <span className="absolute left-4 right-4 -bottom-px h-[2px] bg-[var(--color-gold)]" />
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
