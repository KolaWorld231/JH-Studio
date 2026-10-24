# JH Studio Design & Development — Website

Built with Next.js 16 (App Router, Turbopack), TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Hosting

**GitHub Pages** (`.github/workflows/deploy-pages.yml`): builds and deploys
automatically on every push to `main` (plus, temporarily, this PR's branch
for preview — remove that branch from the workflow's trigger list once
merged). The site will be live at
`https://<owner>.github.io/JH-Studio/`. One manual step first: in the
repo's **Settings → Pages**, set **Source** to **GitHub Actions** — the
workflow can't flip that switch itself.

This uses Next.js static export (`output: "export"`, only enabled when the
workflow sets `GITHUB_PAGES=true`— a normal `npm run build` is unaffected).
A few things that only matter for that path:
- `src/lib/base-path.ts` / `src/components/app-image.tsx`: GitHub Pages
  serves the site at a subpath, and `next/image` doesn't auto-prefix local
  `src` strings when `images.unoptimized` is set (confirmed against a real
  build) — every local-path `<Image>` usage goes through `AppImage` instead,
  which applies the prefix.
- `robots.ts` / `sitemap.ts` / `opengraph-image.tsx` have
  `export const dynamic = "force-static"`, required by static export for
  routes with no dynamic input.
- The project-detail `[slug]` route generates one placeholder static path
  when `projects` is empty, since static export requires at least one
  generated path for a dynamic route — it resolves to the ordinary
  not-found page, not a fabricated project.

**Alternative**: Vercel supports this app natively (no static-export
constraints, real image optimization, automatic PR preview URLs) if
preferred over Pages.

## Structure

- `src/app/page.tsx` — JH Studio parent homepage (division selector).
- `src/app/knitted-architecture/*` — Knitted Architecture division: home,
  philosophy, projects (index + `[slug]` detail template), process, studio,
  contact.
- `src/app/real-estate-development/page.tsx` — Real Estate Development
  "Coming Soon" page.
- `src/components/` — shared UI (header, parent footer, division nav,
  project card/filters, team card, architectural line-drawing motif).
- `src/lib/content/` — all copy and data: `site.ts` (brand copy, contact
  details, social links), `principles.ts` (the five Knitted Architecture
  principles), `projects.ts` (project data model + array), `team.ts` (team
  data model + array), `nav.ts`.
- `docs/` and `CLAUDE.md` — the original planning/blueprint documents this
  site was built from.
- `public/brand/` — the supplied JH Studio logo assets (full brand-board
  references plus cropped lockup/mark images used across the site).

## Design tokens

All color, type, spacing, and motion values are centralized as CSS custom
properties in `src/app/globals.css`. The palette was sampled directly from
the supplied logo files (see the comment at the top of that file for the
sampled hex values and where each one appears in the logo). The logo is
otherwise monochrome, so the rest of the system is a restrained neutral
scale with gold as a single accent.

## Content model — intentionally empty right now

No real project or team content was supplied with the brief, so:

- `src/lib/content/projects.ts` exports an empty `projects` array. The
  portfolio index, filters, and `[slug]` detail template are fully built
  and data-driven — add approved projects to this array (matching the
  `Project` type) and they'll appear everywhere automatically. A project
  can also set `blueprintToBuilding: { drawing, rendering }` to get the
  signature plan-to-photo crossfade sequence (`src/components/
  blueprint-to-building.tsx`) on its detail page — only set this when the
  two images are verified to depict the same project; it's never inferred
  automatically from the gallery.
- `src/lib/content/team.ts` exports an empty `team` array for the same
  reason. The Studio page renders a deliberate empty state instead of
  fabricated profiles.
- `src/lib/content/site.ts` has an empty `contactDetails` object and
  `socialLinks` array. The contact page and footer both check for this
  data and show an honest "coming soon" state instead of a fake
  functioning form or placeholder contact info.

Nothing on the site fabricates projects, people, claims, or contact
details — this was a hard requirement in the brief.

## What the owner still needs to supply

1. **Contact details** (email/phone/location) and/or a real form
   submission endpoint — add to `contactDetails` in `src/lib/content/site.ts`.
2. **Social links** — add to `socialLinks` in the same file.
3. **Team member profiles** — add entries to `src/lib/content/team.ts`.
4. **Project content** (drawings, renders, photos, copy, verified status)
   — add entries to `src/lib/content/projects.ts`.
5. **Original logo vector/high-res source**, if available — the current
   assets in `public/brand/` are cropped from the supplied JPEG brand
   board; a true SVG/transparent PNG would render more crisply at small
   sizes (e.g. the header mark).
6. A detailed, studio-specific design **process** write-up, if the brief
   in `docs/` wants something more specific than the principles-led
   overview currently on `/knitted-architecture/process`.

## Accessibility & motion

- All animated reveals (`src/components/reveal.tsx`,
  `src/components/architectural-lines.tsx`) respect
  `prefers-reduced-motion` via `src/lib/hooks/use-reveal.ts` and render
  their final state immediately when it's set.
- Focus states are visible (`:focus-visible` in `globals.css`), nav
  landmarks are semantic (`header`, `nav`, `main`, `footer`), and images
  use descriptive alt text.
- Verified: `npm run build` and `npm run lint` both pass clean; all
  routes return 200 (and the unknown-project route correctly 404s).
