"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Knitted Architecture", href: "/knitted-architecture" },
  { label: "Real Estate Development", href: "/real-estate-development" },
  { label: "Contact", href: "/knitted-architecture/contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex flex-col items-center justify-center gap-1.5 w-9 h-9 border border-[var(--color-border)]"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span
          className={`block h-px w-4 bg-[var(--color-ink)] transition-transform ${
            open ? "translate-y-[3px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-px w-4 bg-[var(--color-ink)] transition-transform ${
            open ? "-translate-y-[3px] -rotate-45" : ""
          }`}
        />
      </button>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute left-0 right-0 top-[72px] border-b border-[var(--color-border)] bg-[var(--color-paper)] px-5 py-6"
        >
          <ul className="flex flex-col gap-4 text-base">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[var(--color-ink)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
