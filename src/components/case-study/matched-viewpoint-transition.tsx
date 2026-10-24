"use client";

import { AppImage } from "@/components/app-image";
import { usePageScrollProgress } from "@/lib/hooks/use-page-scroll-progress";
import type { ProjectImage } from "@/lib/content/projects";

type AnchorPoint = [number, number];

/**
 * A scroll-driven plan-to-photo transition using genuine geometric
 * correspondence rather than a generic crossfade: two anchor points per
 * image (percentage coordinates within each image's own box) define a
 * 2-point affine transform (uniform scale + translate) that visually lands
 * the drawing's geometry exactly on the photo's corresponding edges before
 * the opacity crossfade begins — "the drawing becomes the place," not two
 * unrelated images dissolving into each other.
 *
 * Driven entirely by CSS calc()/clamp() referencing --scroll-progress (set
 * by use-page-scroll-progress.ts on this component's own ref) — no React
 * re-renders per scroll frame, matching the rest of this codebase's motion
 * discipline. The affine coefficients themselves are computed once from
 * the supplied anchor points, not recomputed per frame.
 */
export function MatchedViewpointTransition({
  drawing,
  photo,
  anchorPoints,
}: {
  drawing: ProjectImage;
  photo: ProjectImage;
  anchorPoints: { drawing: [AnchorPoint, AnchorPoint]; photo: [AnchorPoint, AnchorPoint] };
}) {
  const ref = usePageScrollProgress<HTMLDivElement>();

  const [d1, d2] = anchorPoints.drawing;
  const [p1, p2] = anchorPoints.photo;
  const drawingDist = Math.hypot(d2[0] - d1[0], d2[1] - d1[1]) || 1;
  const photoDist = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) || 1;
  const scale = photoDist / drawingDist;
  const tx = p1[0] - d1[0] * scale;
  const ty = p1[1] - d1[1] * scale;

  // Scroll progress 0-0.7 performs the geometric landing; 0.7-1 crossfades
  // opacity once the geometry has already landed — never a flat dissolve.
  const landPhase = "clamp(0, calc(var(--scroll-progress, 0) / 0.7), 1)";
  const fadePhase = "clamp(0, calc((var(--scroll-progress, 0) - 0.7) / 0.3), 1)";

  return (
    <div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface)]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          transformOrigin: "0 0",
          transform: `translate(calc(${landPhase} * ${tx}%), calc(${landPhase} * ${ty}%)) scale(calc(1 + ${landPhase} * ${scale - 1}))`,
          opacity: `calc(1 - ${fadePhase})`,
        }}
      >
        <AppImage src={drawing.src} alt={drawing.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0" style={{ opacity: fadePhase }}>
        <AppImage src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}
