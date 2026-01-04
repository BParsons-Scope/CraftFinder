// app/result/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type StoredPayload = {
  responses: Record<string, string[]>;
};

export default function ResultPage() {
  const [payload, setPayload] = useState<StoredPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("craftfinder_responses_v1");
      if (!raw) {
        setPayload(null);
        return;
      }
      const parsed = JSON.parse(raw) as { responses?: Record<string, string[]> };
      setPayload({ responses: parsed.responses ?? {} });
    } catch (e) {
      setError("Couldn’t read your quiz answers (storage was malformed).");
    }
  }, []);

  const answeredCount = payload
    ? Object.values(payload.responses).filter((arr) => Array.isArray(arr) && arr.length > 0).length
    : 0;

  return (
    <main
      style={{
        minHeight: "100dvh",
        padding: 16,
        maxWidth: 680,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h1 style={{ margin: 0, fontSize: 26, lineHeight: 1.15 }}>Results</h1>

      <p style={{ margin: 0, opacity: 0.8 }}>
        MVP placeholder: this page will show real craft recommendations once scoring is wired in.
      </p>

      {error && (
        <div style={{ padding: 12, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 12 }}>
          {error}
        </div>
      )}

      {!payload ? (
        <div style={{ padding: 12, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 12 }}>
          No saved quiz answers found. Try taking the quiz first.
        </div>
      ) : (
        <>
          <div style={{ padding: 12, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 12 }}>
            <strong>Answered questions:</strong> {answeredCount}
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
              (Skipped questions are totally fine.)
            </div>
          </div>

          <details style={{ padding: 12, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 12 }}>
            <summary style={{ cursor: "pointer" }}>Show raw responses (debug)</summary>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: 10 }}>
              {JSON.stringify(payload, null, 2)}
            </pre>
          </details>
        </>
      )}

      <div style={{ marginTop: "auto", display: "flex", gap: 10 }}>
        <Link
          href="/quiz"
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 14,
            background: "black",
            color: "white",
            textDecoration: "none",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Retake quiz
        </Link>

        <Link
          href="/"
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 14,
            background: "white",
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Home
        </Link>
      </div>
    </main>
  );
}
