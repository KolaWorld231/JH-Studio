import type { NextConfig } from "next";

// GitHub Pages serves this repo at <owner>.github.io/<repo>/, not at the
// domain root, so every internal link/asset needs that prefix baked in at
// build time. The deploy workflow sets GITHUB_PAGES=true; local dev and any
// other host (Vercel, a custom domain fronting Pages) stay at "/".
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPagesBuild ? "/JH-Studio" : "";

const nextConfig: NextConfig = {
  /* config options here */
  // Exposed to app code (src/lib/base-path.ts) since next/image doesn't
  // auto-prepend basePath to local `src` strings when images.unoptimized
  // is set (confirmed against a real static-export build).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isGithubPagesBuild
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        images: { unoptimized: true },
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
