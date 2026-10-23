import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EmptyState } from "@/components/empty-state";
import { TeamMemberCard } from "@/components/team-member-card";
import { Reveal } from "@/components/reveal";
import { team } from "@/lib/content/team";
import { siteContent } from "@/lib/content/site";

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

      <section className="container-edge py-16 md:py-20">
        {team.length === 0 ? (
          <Reveal>
            <EmptyState
              title="Team profiles are coming soon"
              description="Current JH Studio team members will be introduced here as their profiles are approved. We don't publish placeholder names or biographies."
            />
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <Reveal key={member.id} delayMs={i * 60}>
                <TeamMemberCard member={member} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
