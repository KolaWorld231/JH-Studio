# Technical Requirements

## First step
Inspect the existing repository before choosing or changing frameworks. Do not replace an existing stack without a clear reason. If the repository is empty, propose a suitable modern stack and briefly explain the choice before implementation.

## Core requirements
- Responsive layouts for mobile, tablet, and desktop.
- Reusable components for navigation, footer, division panels, project cards, filters, team profiles, and project detail templates.
- Content and portfolio data separated from presentation.
- Centralized design tokens, especially colors and typography.
- Optimized images and lazy loading where appropriate.
- Accessible keyboard navigation, semantic structure, alt text, and form labels.
- `prefers-reduced-motion` support.
- Sensible metadata and page titles.
- Contact form only if a real submission destination or backend is configured; otherwise provide approved contact details or clearly indicate the form needs integration.
- No fabricated project content, team profiles, contact details, or testimonials.
- Clear loading, empty, and error states where relevant.

## Quality checks
Use scripts available in the repository for linting, type checking, and building. Test main routes and division links. Verify layout at mobile and desktop widths. Confirm line animations do not block navigation and reduced-motion settings work.

## Delivery report
At completion, provide:
- Summary of the implementation
- Files created or modified
- Commands/tests run and outcomes
- Assets/content still required from the owner
- Any known limitations
