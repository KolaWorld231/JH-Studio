import { contactDetails, siteContent, socialLinks } from "@/lib/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

/**
 * schema.org Organization markup, built only from approved content in
 * src/lib/content/site.ts. Fields with no approved value (address, phone,
 * sameAs links) are simply omitted rather than filled with placeholders —
 * they'll appear automatically once that data is added.
 */
export function OrganizationJsonLd() {
  const sameAs = socialLinks.map((social) => social.href);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteContent.parentFullName,
    alternateName: siteContent.parentName,
    description: siteContent.valueProposition,
    slogan: siteContent.tagline,
  };

  if (siteUrl) {
    data.url = siteUrl;
    data.logo = `${siteUrl}/brand/jh-studio-mark-light.jpg`;
  }
  if (contactDetails.email) data.email = contactDetails.email;
  if (contactDetails.phone) data.telephone = contactDetails.phone;
  if (contactDetails.location) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: contactDetails.location,
    };
  }
  if (sameAs.length > 0) data.sameAs = sameAs;

  // Escape "<" so a value containing "</script>" can't break out of the
  // tag — defense in depth; all fields here come from our own trusted
  // content module, but this keeps it safe if that ever changes.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
