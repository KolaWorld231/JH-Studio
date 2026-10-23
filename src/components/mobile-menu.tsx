"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = [
  { label: "Knitted Architecture", href: "/knitted-architecture" },
  { label: "Real Estate Development", href: "/real-estate-development" },
  { label: "Contact", href: "/knitted-architecture/contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    function onPointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="md:hidden" ref={containerRef}>
      <button
        ref={buttonRef}
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
          className="fixed left-0 right-0 top-[72px] border-b border-[var(--color-border)] bg-[var(--color-paper)] px-5 py-6"
        >
          <ul className="flex flex-col gap-4 text-base">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close} className="text-[var(--color-ink)]">
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
