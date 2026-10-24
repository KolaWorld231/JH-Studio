import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { EmptyState } from "@/components/empty-state";
import { BriefComposer } from "@/components/brief-composer";
import { contactDetails } from "@/lib/content/site";
import { principles } from "@/lib/content/principles";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with JH Studio about a Knitted Architecture project.",
};

export default function ContactPage() {
  const hasContact = Boolean(
    contactDetails.email || contactDetails.phone || contactDetails.location,
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation"
        description="Tell us about your project, site, and timeline, and we'll follow up about how JH Studio's Knitted Architecture approach could help."
      />

      <section className="container-edge py-16 md:py-20 max-w-2xl">
        {hasContact ? (
          <Reveal>
            <dl className="space-y-4 text-base text-[var(--color-ink-soft)]">
              {contactDetails.email ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="underline underline-offset-4 hover:text-[var(--color-gold)]"
                    >
                      {contactDetails.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {contactDetails.phone ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                    Phone
                  </dt>
                  <dd>{contactDetails.phone}</dd>
                </div>
              ) : null}
              {contactDetails.location ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                    Studio
                  </dt>
                  <dd>{contactDetails.location}</dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        ) : (
          <Reveal>
            <EmptyState
              title="Direct contact details are coming soon"
              description="An approved email, phone number, or studio address will be published here once confirmed. We don't display placeholder contact information."
            />
          </Reveal>
        )}

      </section>

      <section className="container-edge pb-16 md:pb-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-dim)]">Start here</p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl text-[var(--color-ink)] max-w-2xl">
            Tell us about your project — your selections assemble the brief below.
          </h2>
        </Reveal>
        <Reveal delayMs={80} className="mt-10">
          <BriefComposer principles={principles} email={contactDetails.email} />
        </Reveal>
      </section>
    </>
  );
}
