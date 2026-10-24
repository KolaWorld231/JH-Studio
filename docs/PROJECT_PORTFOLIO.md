# Project Portfolio Content Model

## Project statuses
Use controlled values:
- `ongoing`
- `completed`
- `concept`

Only show `concept` when the owner supplies concept/design-study material.

## Suggested project data
```ts
type ProjectStatus = "ongoing" | "completed" | "concept";

type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  category?: string;
  location?: string;
  year?: string | number;
  coverImage?: string;
  summary?: string;
  brief?: string;
  concept?: string;
  designPrinciples?: string[];
  gallery?: Array<{
    src: string;
    alt: string;
    caption?: string;
    kind?: "plan" | "elevation" | "section" | "sketch" | "render" | "photo" | "diagram";
  }>;
};
```

## Rules
- Keep project content data-driven and separate from the page layout.
- Each project must have a stable slug and a dedicated detail route.
- Provide filters for All, Ongoing, Completed, and Concepts & Design Studies when applicable.
- Make project status visible on both the card and detail page.
- Optimize images while preserving the legibility of plans and drawings.
- Use accurate alt text. If a technical drawing's content is unknown, describe it neutrally rather than guessing.
- Do not fabricate sample projects to make the portfolio appear full. Use private placeholders during development or a clear empty state until real content is added.
- Do not claim that a project is completed or ongoing without confirmation.
