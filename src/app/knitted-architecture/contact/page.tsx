import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { EmptyState } from "@/components/empty-state";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { contactScene } from "@/lib/drawing/scenes";
import { contactDetails } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with JH Studio about a Knitted Architecture project.",
};

export default function ContactPage() {
  const hasContact = Boolean(
    contactDetails.email || contactDetails.phone || contactDetails.location,
  );
  const hasForm = Boolean(contactDetails.formEndpoint);

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

        {!hasForm ? (
          <Reveal delayMs={80} className="mt-6">
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              This page is ready for an inquiry form — it needs a real
              submission destination connected before it goes live, so no
              non-functional form is shown here in the meantime.
            </p>
          </Reveal>
        ) : null}
      </section>

      <div className="container-edge pb-16 md:pb-20">
        <div className="relative aspect-[3/1] w-full max-w-2xl mx-auto opacity-80">
          <ArchitecturalDrawing scene={contactScene} />
        </div>
      </div>
    </>
  );
}
