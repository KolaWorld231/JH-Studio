import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EmptyState } from "@/components/empty-state";
import { StudioTable } from "@/components/studio-table";
import { Reveal } from "@/components/reveal";
import { team } from "@/lib/content/team";
import { siteContent } from "@/lib/content/site";
import { DrawingBackdrop } from "@/components/drawing/drawing-backdrop";
import { roofStudyScene } from "@/lib/drawing/reference-scenes";

export const metadata: Metadata = {
  title: "Studio",
  description: "The people behind JH Studio's Knitted Architecture practice.",
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        title="The people practicing Knitted Architecture"
        description={siteContent.valueProposition}
      />

      <section className="container-edge relative overflow-hidden py-16 md:py-20">
        {team.length === 0 ? <DrawingBackdrop scene={roofStudyScene} ambient /> : null}
        <div className="relative z-10">
        {team.length === 0 ? (
          <Reveal>
            <EmptyState
              title="Team profiles are coming soon"
              description="Current JH Studio team members will be introduced here as their profiles are approved. We don't publish placeholder names or biographies."
            />
          </Reveal>
        ) : (
          <Reveal>
            <StudioTable team={team} />
          </Reveal>
        )}
        </div>
      </section>
    </>
  );
}
