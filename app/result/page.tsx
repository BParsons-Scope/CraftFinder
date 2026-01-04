// app/result/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type StoredPayload = { responses: Record<string, string[]> };

export default function ResultPage() {
  const [payload, setPayload] = useState<StoredPayload | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("craftfinder_responses_v1");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as StoredPayload;
      setPayload(parsed);
    } catch {
      setPayload({ responses: {} });
    }
  }, []);

  return (
    <main style={{ minHeight: "100dvh", padding: 16, maxWidth: 680, margin: "0 auto" }}>
      <h1 style={{ margin: 0, fontSize: 26 }}>Results</h1>
      <p style={{ opacity: 0.8 }}>
        MVP placeholder: we’ll add proper scoring later. For now, this confirms the quiz flow works.
      </p>

      <pre style={{ whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.05)", padding: 12, borderRadius: 12 }}>
        {JSON.stringify(payload, null, 2)}
      </pre>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
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
