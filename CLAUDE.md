# Instructions for Claude Code — JH Studio Website

Before coding, read `README.md` and every file in `docs/`, especially `docs/PREMIUM_VISUAL_DIRECTION.md`. Treat them as the project's source of truth and premium visual direction as a core requirement.

## Business and information architecture
- JH Studio Design & Development is the parent company.
- Its two divisions are:
  1. **Knitted Architecture** — the fully developed division for launch.
  2. **Real Estate Development** — visible on the parent homepage, clearly labelled **Coming Soon**.
- The main JH Studio homepage introduces the company and lets visitors choose a division.
- The parent-company footer must include About JH Studio, Our Team, Our Divisions, Contact, and social links.
- Inside Knitted Architecture, use a division-specific navigation and content experience.
- Current team members are the only people shown at launch. Implement team data in a reusable structure so future members can be added without redesigning the site.
- Projects must support ongoing, completed, and (when available) concepts/design studies. Each project should have its own detail page.

## Design direction
- Minimal, clean, refined, architectural, spacious, and editorial.
- Use subtle animated architectural linework inspired by real floor-plan drafting and architectural sketches.
- The primary motion concept is **blueprint-to-building**: a line drawing can progressively appear and transition into a rendered building image where suitable.
- Combine editorial project layouts with selected blueprint-to-building animations. Do not animate every element.
- Avoid paint splashes, brush strokes, rough decorative scribbles, excessive parallax, noisy backgrounds, and distracting effects.
- Motion must respect `prefers-reduced-motion` and remain usable on mobile.
- Keep content readable and interactions accessible.

## Brand assets and color
- The official logo has not yet been supplied in this repository.
- Do not guess, fabricate, or lock in final brand colors before the logo is added.
- Follow `docs/BRAND_AND_LOGO.md` exactly when the logo becomes available.
- Centralize colors, typography, spacing, borders, and animation settings in design tokens/CSS variables so palette updates are made in one place.
- Do not recolor, distort, crop, stretch, or recreate the logo without explicit instruction.

## Implementation workflow
1. Inspect the existing repository and identify its framework, scripts, and conventions before changing files.
2. Summarize the planned implementation and any assumptions.
3. Build incrementally; preserve existing project conventions unless there is a clear reason to change them.
4. Use reusable components for navigation, footer, project cards, project filters, team members, and project detail pages.
5. Keep project, team, and division content data-driven rather than hard-coded into repeated page markup.
6. Add useful empty states for projects or team data that has not been supplied. Never fabricate completed projects, credentials, people, contact details, or client testimonials.
7. Test responsive layouts, keyboard navigation, accessible contrast, reduced-motion behavior, links, and build/lint scripts available in the repository.
8. At the end, report files created/changed, tests run, known gaps, and what content/assets the owner still needs to provide.

## Content accuracy
Use the approved information in `docs/CONTENT_AND_COPY.md` and the JH Studio strategy document. Do not invent business claims, project statuses, staff biographies, contact details, or client names.
