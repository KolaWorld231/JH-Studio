import type { MetadataRoute } from "next";

// Required for `output: "export"` (static hosting, e.g. GitHub Pages) —
// this route has no dynamic input, so it's always statically renderable.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/sitemap.xml`
      : undefined,
  };
}
