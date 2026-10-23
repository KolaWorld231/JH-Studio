export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  portrait?: string;
  links?: { label: string; href: string }[];
};

// Current team members, approved by the owner, go here. None have been
// supplied yet, so the studio page renders a deliberate empty state rather
// than fabricated profiles. Add entries as they are approved — the studio
// page and card component are already data-driven.
export const team: TeamMember[] = [];
