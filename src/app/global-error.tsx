"use client";

import { useEffect } from "react";

/**
 * Catches errors thrown by the root layout itself (not just page content) —
 * error.tsx alone can't cover that case, since it still renders inside the
 * root layout. This replaces <html>/<body> entirely, so it can't rely on
 * design tokens or fonts from globals.css in case those are implicated.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: "#fbfaf7",
          color: "#1c1c1a",
          padding: "1.5rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#a9741c" }}>
            Something went wrong
          </p>
          <h1 style={{ marginTop: "1rem", fontSize: "1.75rem" }}>JH Studio hit a snag</h1>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", lineHeight: 1.6, color: "#4a4a45" }}>
            Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              display: "inline-flex",
              alignItems: "center",
              background: "#1c1c1a",
              color: "#fbfaf7",
              padding: "0.75rem 1.5rem",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
