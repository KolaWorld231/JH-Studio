# Brand Palette and Logo Handling

## Current state
The official JH Studio logo has not yet been added to the project. Therefore, the final brand palette is **pending logo inspection**. Do not present guessed colors as official brand colors.

## When the logo is added
1. Locate the logo asset supplied by the owner. Prefer the original vector/SVG file; otherwise use a high-resolution PNG with transparency.
2. Inspect the actual logo colors. Record each color as a HEX value and note where it appears in the logo (primary mark, secondary mark, wordmark, accent).
3. Identify a restrained palette:
   - Primary brand color: sampled from the most defining logo color.
   - Secondary brand color(s): sampled from other meaningful logo colors, if present.
   - Neutral background: choose a light or dark neutral that complements the logo and supports an architectural editorial style.
   - Text color: ensure comfortable readability.
   - Accent color: use only if the logo or visual system justifies one.
4. If the logo is monochrome, do not invent bright brand colors. Build a refined neutral system and use linework, typography, imagery, and spacing to provide character.
5. Check text/background contrast for accessibility. If an exact logo color is too light for body text, preserve it for brand accents and use an accessible text color.
6. Keep the logo itself unchanged. Do not stretch, distort, recolor, crop, add effects, or redraw it.
7. Present the extracted palette and its proposed roles to the owner in a concise summary before treating it as final, if the asset suggests ambiguous colors or multiple possible palettes.

## Tokens
Create a single source of truth using CSS custom properties or the project's existing token system. Example structure only—these are placeholders, not JH Studio's official colors:

```css
:root {
  --color-brand-primary: /* sample from approved logo */;
  --color-brand-secondary: /* sample from approved logo, if any */;
  --color-background: /* chosen neutral */;
  --color-surface: /* chosen neutral */;
  --color-text: /* accessible text color */;
  --color-muted: /* secondary text */;
  --color-linework: /* restrained linework color */;
  --color-border: /* subtle border */;
  --motion-duration: 700ms;
}
```

Replace every placeholder with deliberate values only after the logo and contrast checks have been reviewed. Never leave invalid CSS values in the finished build.

## Applying the palette
- The parent homepage and both division experiences should feel related.
- Knitted Architecture may use the palette with more technical linework and editorial project imagery.
- Real Estate Development should remain consistent with the parent identity even while marked Coming Soon.
- Avoid using every logo color everywhere. Use a disciplined hierarchy and substantial whitespace.
- Use colors in a way that preserves project imagery and drawings as the visual focus.
- If architectural drawings require a blueprint-like background, treat that as a contextual visual treatment, not automatically as a new brand color.

## Typography
Inspect the logo and any supplied brand guidelines before choosing final fonts. Use a restrained pairing: a distinctive, highly legible display face for headings and a clean, readable text face for body copy. Prefer web-safe performance, sensible fallbacks, and consistent type scale. Do not assume a specific font is official unless documented by the owner.

## Asset paths
Recommended:
- `public/brand/jh-studio-logo.svg`
- `public/brand/jh-studio-logo.png`
- `public/brand/brand-reference/` for approved visual references
- `public/images/projects/` for project visuals
