import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const markSrc =
    tone === "paper" ? "/brand/jh-studio-mark-dark.jpg" : "/brand/jh-studio-mark-light.jpg";

  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 shrink-0 group"
      aria-label="JH Studio Design & Development — home"
    >
      <Image
        src={markSrc}
        alt="JH Studio knitted mark"
        width={32}
        height={32}
        className="shrink-0 rounded-[2px]"
        priority
      />
      <span
        className={`font-display text-[1.05rem] tracking-[0.01em] leading-none ${
          tone === "paper" ? "text-[var(--color-night-ink)]" : "text-[var(--color-ink)]"
        }`}
      >
        <span style={{ color: "var(--color-gold)" }}>JH</span> Studio
      </span>
    </Link>
  );
}
