import { ArchitecturalDrawing } from "./architectural-drawing";
import type { DrawingScene } from "@/lib/drawing/types";

/**
 * Section-scoped decorative linework for reserved outer whitespace. The parent
 * must be relative and overflow-hidden; keep copy in a relative z-10 wrapper.
 * Disabled below xl, where there is no reliably empty side field.
 */
export function DrawingBackdrop({
  scene,
  viewBox = "0 0 640 480",
  ambient = false,
  className = "",
}: {
  scene: DrawingScene;
  viewBox?: string;
  ambient?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 hidden overflow-hidden xl:block ${className}`}
    >
      <div
        className="absolute -right-16 -top-12 h-[30rem] w-[42rem] opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse 58% 72% at 88% 18%, black 0%, rgba(0,0,0,0.72) 36%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 58% 72% at 88% 18%, black 0%, rgba(0,0,0,0.72) 36%, transparent 72%)",
        }}
      >
        <ArchitecturalDrawing
          scene={scene}
          viewBox={viewBox}
          mode="progress"
          ambient={ambient}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
