// app/result/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QUESTIONS } from "../lib/quiz/questions";

type StoredPayload = {
  responses: Record<string, string[]>;
};

type ReflectedAnswer = {
  questionId: string;
  questionPrompt: string;
  optionLabels: string[]; // empty => skipped
};

function safeParse(raw: string | null): StoredPayload | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredPayload>;
    if (!parsed || typeof parsed !== "object") return null;
    return { responses: parsed.responses ?? {} };
  } catch {
    return null;
  }
}

export default function ResultPage() {
  const [payload, setPayload] = useState<StoredPayload | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("craftfinder_responses_v1");
    setPayload(safeParse(raw));
  }, []);

  const reflected = useMemo<ReflectedAnswer[]>(() => {
    if (!payload) return [];

    const qById = new Map(QUESTIONS.map((q) => [q.id, q]));
    const optionLabelById = new Map<string, string>();
    for (const q of QUESTIONS) {
      for (const o of q.options) optionLabelById.set(o.id, o.label);
    }

    const entries = Object.entries(payload.responses);

    // Preserve a sensible order: use the QUESTIONS array order where possible
    const orderIndex = new Map(QUESTIONS.map((q, idx) => [q.id, idx]));
    entries.sort(([a], [b]) => (orderIndex.get(a) ?? 9999) - (orderIndex.get(b) ?? 9999));

    return entries.map(([questionId, optionIds]) => {
      const q = qById.get(questionId);
      const labels = (optionIds ?? []).map((oid) => optionLabelById.get(oid) ?? `Unknown option (${oid})`);

      return {
        questionId,
        questionPrompt: q?.prompt ?? `Unknown question (${questionId})`,
        optionLabels: labels,
      };
    });
  }, [payload]);

  const totalQuestionsInPayload = payload ? Object.keys(payload.responses).length : 0;
  const answeredCount = reflected.filter((r) => r.optionLabels.length > 0).length;
  const skippedCount = reflected.filter((r) => r.optionLabels.length === 0).length;

  return (
    <main
      style={{
        minHeight: "100dvh",
        padding: 16,
        maxWidth: 860,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <h1 style={{ margin: 0, fontSize: 26, lineHeight: 1.15 }}>Your Craft Signals</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>
          MVP mode: this page reflects your answers and shows placeholder recommendation tiles.
        </p>
      </header>

      {!payload ? (
        <div
          style={{
            padding: 14,
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "rgba(0,0,0,0.03)",
          }}
        >
          No saved quiz answers found. Take the quiz first, or hit “Retake quiz”.
        </div>
      ) : (
        <>
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            <StatCard label="Questions captured" value={totalQuestionsInPayload} />
            <StatCard label="Answered" value={answeredCount} />
            <StatCard label="Skipped" value={skippedCount} />
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h2 style={{ margin: "6px 0 0", fontSize: 18 }}>What you told us</h2>

            {reflected.length === 0 ? (
              <div style={{ opacity: 0.8 }}>No responses recorded yet.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {reflected.map((r) => (
                  <div
                    key={r.questionId}
                    style={{
                      padding: 14,
                      borderRadius: 14,
                      border: "1px solid rgba(0,0,0,0.15)",
                      background: "white",
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{r.questionPrompt}</div>

                    {r.optionLabels.length === 0 ? (
                      <div style={{ fontSize: 14, opacity: 0.7, fontStyle: "italic" }}>Skipped</div>
                    ) : (
                      <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
                        {r.optionLabels.map((label, idx) => (
                          <li key={`${r.questionId}_${idx}`} style={{ fontSize: 14 }}>
                            {label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h2 style={{ margin: "6px 0 0", fontSize: 18 }}>Placeholder recommendations</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>
              These are layout dummies — your real “secret sauce” suggestions will slot in here later.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 12,
              }}
            >
              <PlaceholderTile
                title="Try: Mini watercolour postcards"
                blurb="Low-setup, lounge-friendly, and a nice little giftable output."
                tag="Quick win"
              />
              <PlaceholderTile
                title="Try: Sashiko mending"
                blurb="Cosy, rhythmic stitching with a practical result (and mild smugness)."
                tag="Useful + calming"
              />
              <PlaceholderTile
                title="Try: Air-dry clay trinket dish"
                blurb="Mess-light if you’re organised, and very satisfying in one sitting."
                tag="One session"
              />
              <PlaceholderTile
                title="Try: Digital collage print"
                blurb="If screens are allowed, this one’s pure vibes with minimal mess."
                tag="Digital"
              />
            </div>
          </section>

          <details
            style={{
              padding: 14,
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "rgba(0,0,0,0.03)",
            }}
          >
            <summary style={{ cursor: "pointer", fontWeight: 600 }}>Debug payload (raw)</summary>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: 10 }}>
              {JSON.stringify(payload, null, 2)}
            </pre>
          </details>
        </>
      )}

      <footer style={{ marginTop: "auto", display: "flex", gap: 10 }}>
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
            fontWeight: 700,
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
      </footer>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 14,
        border: "1px solid rgba(0,0,0,0.15)",
        background: "white",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function PlaceholderTile({
  title,
  blurb,
  tag,
}: {
  title: string;
  blurb: string;
  tag: string;
}) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.15)",
        background: "linear-gradient(135deg, rgba(255,122,24,0.12), rgba(122,252,255,0.12))",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
        <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.08)",
            whiteSpace: "nowrap",
          }}
        >
          {tag}
        </span>
      </div>
      <p style={{ margin: "10px 0 0", opacity: 0.85 }}>{blurb}</p>
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
        (Placeholder — will be driven by scoring later)
      </div>
    </div>
  );
}
