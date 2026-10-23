# Design System

## Visual principles
1. Minimalism with purpose.
2. Architectural precision without sterile coldness.
3. Editorial hierarchy and generous whitespace.
4. Linework that suggests plans, grids, axes, dimensions, and construction logic.
5. Real project work is the hero; effects remain secondary.
6. The parent company and divisions feel connected but have distinct content experiences.

## Layout
- Use a clear grid and consistent spacing scale.
- Use generous margins and readable line lengths.
- Alternate between quiet text-led sections and large project imagery.
- On desktop, project layouts may use asymmetric editorial grids where they improve storytelling.
- On mobile, simplify layouts into a clear single-column reading order.
- Avoid over-carding every content section; use cards where they help scanning or selection.

## Linework
- Use thin, precise SVG/CSS strokes, plan fragments, axes, grids, and dimension-like marks.
- Draw lines progressively with SVG stroke animation or a similarly lightweight technique.
- Keep line opacity and density restrained.
- Linework can connect sections or reveal a plan, but must not reduce text contrast.
- Avoid paint splashes, watercolor effects, brush marks, and arbitrary decorative squiggles.

## Blueprint-to-building sequence
Use selectively, such as in the Knitted Architecture hero or selected project pages:
1. Fine architectural lines draw onto the page.
2. The lines resolve into a legible floor plan, elevation, or outline.
3. Where a matching rendering/photo exists, transition or crossfade to that supplied visual.
4. The final building image remains long enough to be understood.
5. If no matching final visual exists, do not fabricate one; use the drawing as a standalone motion.

## Interaction and accessibility
- Motion must be subtle and purposeful.
- Respect `prefers-reduced-motion`; provide a static equivalent.
- Never make essential information available only through animation.
- Ensure keyboard focus states are visible.
- Use semantic headings and landmarks, descriptive alt text, accessible form labels, and adequate contrast.
- Avoid motion that causes dizziness or interferes with reading.
- Optimize line animations and large images for mobile and low-bandwidth conditions.

## Color and type
Follow `BRAND_AND_LOGO.md`. Do not set final brand colors until the official logo has been supplied and inspected. Centralize all colors, typography, spacing, borders, and motion values as tokens.
