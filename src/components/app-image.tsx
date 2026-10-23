import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/base-path";

/**
 * Drop-in replacement for next/image's <Image> that applies the GitHub
 * Pages basePath to local ("/...") src strings. Use this everywhere a
 * local image path comes from a plain string (our own components, or
 * content-data image paths) rather than next/image directly.
 */
export function AppImage({ src, ...rest }: ImageProps) {
  const resolvedSrc = typeof src === "string" ? withBasePath(src) : src;
  // `alt` is required by ImageProps (TypeScript enforces it on every call
  // site), just not visible to the a11y linter through this spread.
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image src={resolvedSrc} {...rest} />;
}
