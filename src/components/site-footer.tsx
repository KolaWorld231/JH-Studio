import Link from "next/link";
import Image from "next/image";
import { contactDetails, siteContent, socialLinks } from "@/lib/content/site";
import { footerDivisionLinks } from "@/lib/content/nav";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const hasContact = Boolean(
    contactDetails.email || contactDetails.phone || contactDetails.location,
  );

  return (
    <footer className="bg-[var(--color-night)] text-[var(--color-night-ink)]">
      <div className="container-edge py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12 md:gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 w-fit" aria-label="JH Studio — home">
              <Image
                src="/brand/jh-studio-mark-dark.jpg"
                alt="JH Studio knitted mark"
                width={30}
                height={30}
                className="rounded-[2px]"
              />
              <span className="font-display text-[1.05rem]">
                <span style={{ color: "var(--color-gold)" }}>JH</span> Studio
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-night-muted)]">
              {siteContent.heroLine}
            </p>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--color-night-muted)]">
              About JH Studio
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/#about" className="hover:text-[var(--color-gold)] transition-colors">
                  Our Purpose
                </Link>
              </li>
              <li>
                <Link
                  href="/knitted-architecture/studio"
                  className="hover:text-[var(--color-gold)] transition-colors"
                >
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--color-night-muted)]">
              Our Divisions
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerDivisionLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[var(--color-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--color-night-muted)]">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {hasContact ? (
                <>
                  {contactDetails.email ? (
                    <li>
                      <a
                        href={`mailto:${contactDetails.email}`}
                        className="hover:text-[var(--color-gold)] transition-colors"
                      >
                        {contactDetails.email}
                      </a>
                    </li>
                  ) : null}
                  {contactDetails.phone ? <li>{contactDetails.phone}</li> : null}
                  {contactDetails.location ? <li>{contactDetails.location}</li> : null}
                </>
              ) : (
                <li className="text-[var(--color-night-muted)]">
                  Contact details coming soon.{" "}
                  <Link
                    href="/knitted-architecture/contact"
                    className="underline underline-offset-4 hover:text-[var(--color-gold)]"
                  >
                    Visit the contact page
                  </Link>
                </li>
              )}
            </ul>

            <h2 className="mt-8 text-xs uppercase tracking-[0.14em] text-[var(--color-night-muted)]">
              Connect
            </h2>
            {socialLinks.length > 0 ? (
              <ul className="mt-4 space-y-2.5 text-sm">
                {socialLinks.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-[var(--color-gold)] transition-colors"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-[var(--color-night-muted)]">Social channels coming soon.</p>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-night-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--color-night-muted)]">
          <p>© {year} JH Studio Design & Development. All rights reserved.</p>
          <p className="italic">{siteContent.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
