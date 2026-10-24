"use client";

import { useState } from "react";
import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { EmptyState } from "@/components/empty-state";
import { principleScenes, defaultScene } from "@/lib/drawing/scenes";
import { projectTypeOptions, projectStageOptions, type ProjectType, type ProjectStage } from "@/lib/content/brief-options";
import type { Principle } from "@/lib/content/principles";

function ToggleGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">{label}</legend>
      <div role="group" className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`px-4 py-2 text-sm transition-colors ${
              value === option
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * An interactive project-brief composer: selections assemble a live "brief
 * diagram" (reusing the scene-swap technique from philosophy-model.tsx /
 * process-stepper.tsx) and a mailto: link with a complete pre-filled email —
 * no backend exists on this static-export site, so this is the honest
 * equivalent of a working submission, never a simulated success state.
 */
export function BriefComposer({ principles, email }: { principles: Principle[]; email?: string }) {
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [projectStage, setProjectStage] = useState<ProjectStage | null>(null);
  const [priorityIds, setPriorityIds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  function togglePriority(id: string) {
    setPriorityIds((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));
  }

  const activeScene = priorityIds.length > 0 ? principleScenes[priorityIds[priorityIds.length - 1]] : defaultScene;

  const priorityLabels = principles.filter((p) => priorityIds.includes(p.id)).map((p) => p.title);

  const subject = `Project inquiry${projectType ? `: ${projectType}` : ""}`;
  const bodyLines = [
    projectType ? `Project type: ${projectType}` : null,
    projectStage ? `Stage: ${projectStage}` : null,
    priorityLabels.length > 0 ? `Principles of interest: ${priorityLabels.join(", ")}` : null,
    notes ? `\nSite notes:\n${notes}` : null,
  ].filter(Boolean);
  const mailtoHref = email
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`
    : undefined;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
        <div className="space-y-8">
          <ToggleGroup label="Project type" options={projectTypeOptions} value={projectType} onChange={setProjectType} />
          <ToggleGroup label="Stage" options={projectStageOptions} value={projectStage} onChange={setProjectStage} />

          <fieldset>
            <legend className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Principles of interest
            </legend>
            <div role="group" className="mt-3 flex flex-wrap gap-2">
              {principles.map((principle) => (
                <button
                  key={principle.id}
                  type="button"
                  aria-pressed={priorityIds.includes(principle.id)}
                  onClick={() => togglePriority(principle.id)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    priorityIds.includes(principle.id)
                      ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                      : "border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
                  }`}
                >
                  {principle.title}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="brief-notes" className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Tell us about the site
            </label>
            <textarea
              id="brief-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="mt-3 w-full border border-[var(--color-border)] bg-[var(--color-paper)] p-3 text-sm text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]"
              placeholder="Location, size, timeline — whatever's useful to know."
            />
          </div>
        </div>

        <div className="aspect-square bg-[var(--color-surface)]" aria-hidden="true">
          <ArchitecturalDrawing key={activeScene.id} scene={activeScene} mode="reveal" showGrid={false} durationMs={700} />
        </div>
      </div>

      <div className="mt-10">
        {mailtoHref ? (
          <a
            href={mailtoHref}
            className="inline-flex items-center bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-[var(--color-gold)] transition-colors"
          >
            Send this brief
          </a>
        ) : (
          <EmptyState
            title="Direct contact details are coming soon"
            description="This brief is ready — it just needs an approved email address connected before it can be sent. We don't display a placeholder destination."
          />
        )}
      </div>
    </div>
  );
}
