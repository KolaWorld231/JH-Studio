import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectFilters } from "@/components/project-filters";
import { projects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ongoing, completed, and concept projects by JH Studio's Knitted Architecture practice.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects"
        description="Each project is an editorial case study: a brief, a concept, and the drawings and imagery that explain how it connects people, place, and nature."
      />
      <section className="container-edge py-16 md:py-20">
        <ProjectFilters projects={projects} />
      </section>
    </>
  );
}
