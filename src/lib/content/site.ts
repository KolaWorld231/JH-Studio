export const siteContent = {
  parentName: "JH Studio",
  parentFullName: "JH Studio Design & Development",
  tagline: "Architecture that connects.",
  heroLine:
    "We design and develop places that bring people, spaces, and nature together.",
  vision:
    "To design and develop places that strengthen communities, foster human connection, and bring people and nature together.",
  mission:
    "Our mission is to knit people, place, and nature together through design and development. We create thoughtful buildings, communities, and environments that foster human connection, respond to their context, and create lasting value for the people and places they serve.",
  valueProposition:
    "At JH Studio, we transform ideas into places of lasting value. By combining design excellence, development intelligence, and our philosophy of Knitted Architecture, we help clients create buildings and communities that perform economically, connect people meaningfully, integrate with nature, and remain relevant for generations.",
  coreIdea:
    "Architecture should not stand apart from the people and places it serves. It should connect them.",
  practiceStatement:
    "JH Studio practices Knitted Architecture — an approach that intentionally weaves people, spaces, nature, culture, and movement into cohesive environments. Buildings are considered social and spatial ecosystems that encourage interaction, strengthen communities, and create meaningful connections between people and their surroundings.",
} as const;

export const divisions = {
  knittedArchitecture: {
    name: "Knitted Architecture",
    href: "/knitted-architecture",
    tagline: "Architecture that connects.",
    description:
      "Architectural design shaped by people, place, and nature.",
    status: "available" as const,
  },
  realEstateDevelopment: {
    name: "Real Estate Development",
    href: "/real-estate-development",
    tagline: "Places of lasting value.",
    description: "Transforming ideas into places of lasting value.",
    status: "coming-soon" as const,
  },
};

// Approved contact details have not been supplied yet. Do not fabricate an
// email address, phone number, or office location — this object is wired
// through the contact page and footer so real details can be dropped in
// without further restructuring once the owner approves them.
export const contactDetails: {
  email?: string;
  phone?: string;
  location?: string;
  formEndpoint?: string;
} = {};

// Approved social links have not been supplied yet. Add entries here (e.g.
// { label: "Instagram", href: "https://instagram.com/..." }) once approved.
export const socialLinks: { label: string; href: string }[] = [];
