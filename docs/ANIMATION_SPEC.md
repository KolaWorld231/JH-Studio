# Animation Specification

## Core idea
Architectural lines should appear as if an architect is carefully drafting a drawing in real time. The result should be restrained, precise, and elegant.

## Recommended motion
- SVG line drawing using stroke-dasharray / stroke-dashoffset, or an equivalent accessible implementation.
- Slow, staggered reveals for plan lines and building outlines.
- Subtle opacity transitions between plan and matching supplied rendering.
- Scroll-triggered reveals for selected project drawings, only where they add meaning.
- Small, restrained transitions for hover/focus states.

## Do not use
- Paint splashes or brush-paint effects.
- Random hand-drawn scribbles.
- Constantly moving backgrounds.
- Excessive parallax, bouncing, or long blocking intro animations.
- Fake building transformations when no matching architectural assets exist.

## Performance
- Prefer SVG/CSS and optimized local assets over large video backgrounds.
- Keep animation durations and easing consistent via tokens.
- Do not run expensive animations continuously if they can play once.
- On small screens, reduce complexity where needed.
- If reduced motion is requested, skip line-drawing sequences and show a static drawing/image.

## Interaction rule
Animations should support understanding the architecture and the relationship between concept, plan, space, and built form. They should never prevent visitors from quickly accessing projects or contact details.
