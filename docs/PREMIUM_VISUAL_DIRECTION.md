# Premium Visual Direction — JH Studio

## 1. Creative ambition

Build JH Studio Design & Development as a distinctive, premium architecture-studio website with the visual confidence, craft, and interaction quality associated with leading digital design and architecture portfolios. This is a quality target, not a claim that the site has won awards.

The experience must feel art-directed and intentional—not like a generic corporate template with animations added afterward. Every visual choice should support JH Studio's philosophy: **Architecture that connects.**

The website should balance:
- Cinematic impact with fast access to information.
- Technical precision with warmth and human connection.
- Minimal layouts with rich architectural storytelling.
- Carefully choreographed motion with accessibility and performance.
- Editorial typography and generous whitespace with large, meaningful project imagery.

## 2. Experience architecture

### Parent homepage: JH Studio
The parent homepage is a deliberate entry point, not a long portfolio page. It introduces JH Studio Design & Development and presents two unmistakable division choices:
1. **Knitted Architecture** — the primary, content-rich experience at launch.
2. **Real Estate Development** — visible as a distinct division, clearly marked **Coming Soon** until approved content is ready.

The division choice should feel like entering one of two related architectural worlds. Use refined transitions and consistent branding; do not make the visitor wait through a long, unskippable intro. Both choices must be obvious and accessible immediately.

### Knitted Architecture
Once selected, this division has its own navigation and a complete architecture-studio experience: philosophy, projects, process, studio/team, and contact. Project pages must feel like editorial case studies rather than generic product pages.

### Parent-company footer
Keep the JH Studio parent-company footer available across relevant pages. Include About JH Studio, current team, divisions, contact, and approved social links. Model team content as data so future members can be added without redesigning the site.

## 3. Art direction

### Overall aesthetic
- Premium architectural editorial: quiet, confident, precise, tactile, and contemporary.
- Use a disciplined grid, generous negative space, considered asymmetry, strong image crops, and intentional typography.
- Let drawings, models, material studies, plans, elevations, sections, and completed project photography provide the visual richness.
- Use restrained borders, labels, indices, coordinates, scale-like marks, and small technical annotations only where they help tell the architectural story.
- Build a recognizable visual rhythm across the parent site, division landing page, portfolio, and project details.

### Avoid
- Generic startup/SaaS layouts, excessive rounded cards, gradients used only for decoration, oversized floating blobs, random abstract shapes, and stock-photo-heavy sections.
- Paint splashes, brush strokes, watercolor marks, or decorative scribbles.
- Unnecessary glassmorphism, loud neon accents, gratuitous parallax, and animation on every element.
- Fake architectural plans, fabricated project imagery, made-up awards, invented clients, or unverified claims.
- Copying another studio's website exactly. Learn from quality standards, but create an original JH Studio identity.

## 4. Logo-led brand system

The official JH Studio logo has not yet been supplied in the project package. **Do not guess the official palette.**

When the logo is added:
1. Inspect the actual file and any supplied brand guidelines.
2. Sample the meaningful colors and record their HEX values.
3. Determine whether the logo is monochrome or multicolor.
4. Propose a restrained palette with semantic roles: brand primary, secondary (if justified), background, surface, text, muted text, borders, and architectural linework.
5. Check accessible contrast. Do not use a low-contrast logo color for body text merely because it appears in the logo.
6. Present the proposed palette briefly for owner review when interpretation is ambiguous.
7. Keep the logo asset unchanged unless the owner explicitly authorizes a variant.

Centralize all color, typography, spacing, border, shadow, and motion values in CSS custom properties or the existing token system. Do not scatter raw values throughout components. If the logo is monochrome, a refined neutral palette is preferable to invented bright colors.

## 5. Signature motion system: architectural drawing in real time

The defining motion language is precise architectural linework that appears to be drafted in real time.

### Motion vocabulary
- Fine vector strokes that progressively draw.
- Floor-plan walls and partitions revealed in a deliberate sequence.
- Grids, axes, alignment marks, dimension lines, section indicators, and elevation outlines used sparingly.
- Layered plan/elevation/section reveals.
- Delicate line-to-image transitions when a matching, real project rendering or photograph is supplied.
- Quiet transitions between navigation states and project chapters.

Linework must look like technical architectural drawing—not handwriting, paint, or loose decorative sketching. Use supplied drawings whenever possible. Any illustrative linework created for the site must be clearly treated as a visual motif, not misrepresented as a real project document.

### Suggested hero sequence
1. The JH Studio identity appears cleanly with a short, restrained entrance.
2. A few fine lines extend across a grid or alignment field.
3. Lines progressively resolve into a supplied architectural plan, elevation, or approved abstract studio motif.
4. The drawing settles; the visitor can immediately choose Knitted Architecture or Real Estate Development.
5. On reduced-motion devices, show the final composed state without the sequence.

Keep the sequence concise, skippable by natural scrolling or interaction, and never block access to navigation or the division choices.

### Blueprint-to-building transition
Use this as a signature storytelling technique only when a real plan and a matching rendering/photo exist:
1. Reveal the actual plan or elevation.
2. Emphasize selected lines or layers.
3. Transition through a restrained mask, overlay, or crossfade to the corresponding rendering/photo.
4. Hold the final image long enough to understand it.
5. Optionally let visitors switch between “Drawing” and “Visualisation” states.

Never imply that an unrelated image is the built result of a plan. If no matching image exists, present the drawing beautifully on its own.

### Animation implementation
- Prefer SVG path animation, CSS transforms/opacity, and lightweight canvas only when justified.
- Use `stroke-dasharray` / `stroke-dashoffset` or an equivalent robust technique for line drawing.
- Use intersection-based reveal triggers only where useful; do not animate every section automatically.
- Keep motion timing coherent, with short interface transitions and longer, deliberate drawing sequences.
- Avoid scroll hijacking, forced waits, cursor gimmicks, and continuous background motion.
- Support `prefers-reduced-motion` with a genuinely complete static experience.
- Respect keyboard and touch interaction. Hover cannot be the only way to reveal content.
- Ensure the site remains usable on lower-powered phones and slower connections.

## 6. Homepage division selector

Treat the two divisions as the central decision on the parent homepage.

### Knitted Architecture panel
- Clearly identified by name.
- Short, approved description.
- Strong architectural image or drawing, if supplied.
- A subtle linework animation that hints at the architectural experience inside.
- Obvious link/CTA to enter the division.

### Real Estate Development panel
- Clearly identified by name.
- Short, approved description.
- Marked **Coming Soon**.
- Use a restrained visual treatment consistent with the brand; do not imply that unavailable services, projects, or investment opportunities are currently open.

The two panels should be balanced but need not be identical. Make the primary available experience clear without hiding the upcoming division.

## 7. Portfolio as a premium editorial experience

Project listings should feel curated, not like a repetitive grid of identical cards.

### Project index
- Provide filters for Ongoing, Completed, and Concepts/Design Studies only when those categories have supplied content.
- Give each project a strong title, status, image/drawing, and minimal metadata.
- Use an intentional mix of large feature projects and smaller supporting projects when the content supports it.
- Keep filters fast, accessible, and usable on touchscreens.
- Include graceful empty states instead of invented projects.

### Individual project case study
Use a reusable data-driven template. Based on available materials, a project may include:
- Project title and verified status.
- Brief, location, category, and year where supplied.
- Design challenge and concept.
- Floor plans, elevations, sections, diagrams, sketches, models, renderings, and photographs.
- Design-development sequence.
- Relevant Knitted Architecture principles.
- Related projects and a contact CTA.

Treat each drawing as a meaningful artifact. Provide enough size and contrast for it to be examined; do not crop away important information for visual effect. Captions and alt text should describe the actual supplied asset accurately.

## 8. Typography, composition, and detail

- Use a deliberate type hierarchy: expressive display typography paired with highly legible body text.
- Confirm any supplied font/brand guidance before choosing final fonts.
- Use typographic scale, line length, letter spacing, and whitespace to establish sophistication—not size alone.
- Keep navigation concise and consistent.
- Use restrained metadata styling for project status, year, location, drawing type, and sequence numbers.
- Keep paragraphs readable and avoid overly wide text columns.
- Use precise alignment and consistent spacing; small inconsistencies undermine a premium finish.

## 9. Interaction quality

Every interaction should feel deliberate:
- Clear hover, focus, pressed, loading, and disabled states where applicable.
- Navigation transitions should preserve orientation and provide an obvious way back to the parent homepage.
- Project filters should update without confusing jumps.
- Gallery viewing should support keyboard, touch, captions, and closing.
- Contact forms must have meaningful validation and a real submission destination before being presented as operational.
- Avoid custom cursor effects unless they add clear utility and remain accessible.

## 10. Performance, accessibility, and responsive craft

Premium quality includes speed and usability.
- Optimize images and use responsive image sizes.
- Lazy-load below-the-fold imagery while prioritizing the actual hero asset.
- Avoid heavy video backgrounds unless there is a strong, content-backed reason.
- Reserve image dimensions to reduce layout shift.
- Test mobile, tablet, laptop, and wide desktop layouts.
- Verify contrast, keyboard focus, semantic landmarks, heading order, labels, alt text, and reduced-motion support.
- Do not make essential content dependent on motion, hover, sound, or color alone.
- Keep the division choice and contact route easy to reach.

## 11. Content integrity

Use the supplied JH Studio strategy as the source of truth for the mission, vision, value proposition, positioning, and five principles of Knitted Architecture. Do not silently invent or rewrite the company's strategy.

Do not fabricate:
- Projects or project statuses.
- Team members, qualifications, or biographies.
- Client names, testimonials, awards, or press coverage.
- Contact information or social accounts.
- Architectural drawings or claims that a rendering represents a completed building.

If an asset or fact is missing, structure the page to accept it later and omit it from the public-facing experience until provided.

## 12. Build and review standard

Before implementation, inspect the existing repository and report the framework, current structure, and proposed approach. Then implement in phases:
1. Design tokens and logo-led palette.
2. Parent homepage and division selector.
3. Knitted Architecture landing and navigation.
4. Portfolio index and individual project case-study template.
5. Philosophy, process, studio/team, and contact.
6. Real Estate Development Coming Soon experience.
7. Animation polish, responsive refinements, accessibility, and performance.

After each phase, check the site visually at mobile and desktop sizes. Run available lint, type, and build commands. Fix console errors and broken routes. At handoff, list the files changed, checks run, remaining content/assets needed, and any known limitations.

**Definition of success:** the website feels unmistakably designed for JH Studio; architectural linework is precise and meaningful; project work leads the storytelling; both divisions are clearly presented; motion is polished but never obstructive; and the entire experience remains fast, accessible, and maintainable.
