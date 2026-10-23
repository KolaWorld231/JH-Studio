"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { EmptyState } from "@/components/empty-state";
import type { Project, ProjectStatus } from "@/lib/content/projects";
import { projectStatusLabels } from "@/lib/content/projects";

type FilterValue = "all" | ProjectStatus;

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const availableStatuses = useMemo(() => {
    const statuses = new Set(projects.map((project) => project.status));
    return Array.from(statuses);
  }, [projects]);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.status === filter)),
    [filter, projects],
  );

  const options: { value: FilterValue; label: string }[] = [
    { value: "all", label: "All Projects" },
    ...availableStatuses.map((status) => ({ value: status, label: projectStatusLabels[status] })),
  ];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by status"
        className="flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-6"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 text-sm transition-colors ${
              filter === option.value
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length === 0
          ? "No projects to show for this filter."
          : `Showing ${filtered.length} project${filtered.length === 1 ? "" : "s"}.`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No projects to show yet"
            description="Approved project work for this category will appear here as it is added. Nothing is fabricated to fill the space."
          />
        </div>
      ) : (
        // Asymmetric editorial grid (docs/DESIGN_SYSTEM.md, PREMIUM_VISUAL_DIRECTION.md §7):
        // a 4-column desktop grid where every 3rd project is a wider, taller
        // "feature" tile (2 cols) and the rest are standard (1 col) — 2+1+1
        // fills a full row every three projects, so the rhythm repeats cleanly
        // for any list length rather than requiring a fixed project count.
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((project, i) => {
            const isFeature = i % 3 === 0;
            return (
              <div key={project.slug} className={isFeature ? "sm:col-span-2 lg:col-span-2" : ""}>
                <ProjectCard
                  project={project}
                  priority={i < 3}
                  size={isFeature ? "feature" : "standard"}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
