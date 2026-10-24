// Mirrors the `basePath` set in next.config.ts for GitHub Pages builds
// (exposed to both server and client via the `env` block there). Local
// absolute asset paths ("/brand/...", "/images/...") need this prefix
// manually wherever they're not already handled by a Next.js convention
// that applies it automatically (e.g. the app/icon.* favicon convention
// does this on its own; next/image's `src` prop does not when
// `images.unoptimized` is set, which GitHub Pages export requires).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(src: string): string {
  if (!basePath || !src.startsWith("/")) return src;
  return `${basePath}${src}`;
}
