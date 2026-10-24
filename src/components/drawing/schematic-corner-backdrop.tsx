import { ArchitecturalDrawing } from "@/components/drawing/architectural-drawing";
import { schematicCornerScene } from "@/lib/drawing/scenes";

/**
 * A low-opacity construction-document fragment anchored to one corner of
 * its containing section, masked so detail concentrates at that corner and
 * fades to nothing before it reaches the text column — never a flat
 * background behind content. Purely decorative (aria-hidden), ignores
 * pointer events, and is hidden below lg: at narrower widths the text
 * column uses the full width this corner space would otherwise occupy, so
 * there's no safe place left to fade it into.
 */
export function SchematicCornerBackdrop({
  corner = "top-right",
}: {
  corner?: "top-right" | "bottom-right";
}) {
  const position = corner === "top-right" ? "top-0 right-0" : "bottom-0 right-0";
  const maskPosition = corner === "top-right" ? "100% 0%" : "100% 100%";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${position} hidden h-[26rem] w-[34rem] lg:block`}
      style={{
        maskImage: `radial-gradient(ellipse 70% 85% at ${maskPosition}, black 0%, transparent 68%)`,
        WebkitMaskImage: `radial-gradient(ellipse 70% 85% at ${maskPosition}, black 0%, transparent 68%)`,
        opacity: 0.5,
      }}
    >
      <ArchitecturalDrawing
        scene={schematicCornerScene}
        viewBox="380 0 260 220"
        className="h-full w-full"
        durationMs={1400}
      />
    </div>
  );
}
