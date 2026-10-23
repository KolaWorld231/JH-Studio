import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
// Required for `output: "export"` (static hosting, e.g. GitHub Pages) —
// this image has no dynamic input, so it's always statically renderable
// into a single PNG at build time.
export const dynamic = "force-static";
export const alt = "JH Studio Design & Development — Architecture that connects.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const markPath = path.join(process.cwd(), "public/brand/jh-studio-mark-dark.jpg");
  const markSrc = `data:image/jpeg;base64,${fs.readFileSync(markPath).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={markSrc}
          width={132}
          height={132}
          alt=""
          style={{ borderRadius: 4 }}
        />
        <div
          style={{
            marginTop: 36,
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ color: "#CA8B21" }}>JH&nbsp;</span>
          <span style={{ color: "#F4F2EC" }}>Studio</span>
        </div>
        <div style={{ marginTop: 22, fontSize: 30, color: "#B4B0A2" }}>
          Architecture that connects.
        </div>
      </div>
    ),
    { ...size },
  );
}
