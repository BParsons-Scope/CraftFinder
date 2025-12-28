// app/page.tsx
"use client";

import { useEffect, useState } from "react";

type Question = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
};

type Result = { title: string; blurb: string };

export default function HomePage() {
  const [expanded, setExpanded] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!expanded) return;
    if (questions.length > 0) return;

    (async () => {
      setLoadingQuestions(true);
      setError(null);
      try {
        const res = await fetch("/api/recommend", { method: "GET" });
        if (!res.ok) throw new Error(`GET /api/recommend failed (${res.status})`);
        const data = await res.json();
        setQuestions(Array.isArray(data.questions) ? data.questions : []);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? "Failed to load questions");
      } finally {
        setLoadingQuestions(false);
      }
    })();
  }, [expanded, questions.length]);

  const canSubmit =
    questions.length > 0 &&
    questions.every((q) => typeof answers[q.id] === "string" && answers[q.id].length > 0) &&
    !submitting;

  async function onSubmit() {
    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`POST /api/recommend failed (${res.status}): ${text.slice(0, 200)}`);
      }

      const data = await res.json();
      setResult(data.result ?? null);
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setExpanded(false);
    setAnswers({});
    setResult(null);
    setError(null);
    // keep questions cached so re-open is instant
  }

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "clamp(16px, 6vh, 48px) auto",
        padding: "0 16px",
        fontSize: 16,
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ margin: "0 0 12px 0", fontSize: 32 }}>Find Your Next Craft</h1>

      <p style={{ margin: "0 0 20px 0", opacity: 0.9 }}>
        Answer a couple of quick questions and get a recommendation.
      </p>

      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.25)",
            background: "white",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Start →
        </button>
      ) : (
        <section style={{ marginTop: 12 }}>
          {loadingQuestions ? (
            <p style={{ marginTop: 12 }}>Loading…</p>
          ) : (
            <>
              {questions.map((q) => (
                <fieldset
                  key={q.id}
                  style={{
                    margin: "12px 0",
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.15)",
                  }}
                >
                  <legend style={{ padding: "0 6px", fontWeight: 600 }}>{q.label}</legend>

                  <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                    {q.options.map((opt) => (
                      <label
                        key={opt.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          border: "1px solid rgba(0,0,0,0.12)",
                          borderRadius: 12,
                        }}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.value}
                          checked={answers[q.id] === opt.value}
                          onChange={(e) =>
                            setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                          }
                        />
                        <span style={{ fontSize: 16 }}>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}

              <button
                onClick={onSubmit}
                disabled={!canSubmit}
                style={{
                  marginTop: 8,
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.25)",
                  background: canSubmit ? "white" : "rgba(0,0,0,0.06)",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
              >
                {submitting ? "Thinking…" : "Get recommendation"}
              </button>

              <button
                onClick={reset}
                style={{
                  marginLeft: 10,
                  marginTop: 8,
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "transparent",
                  fontSize: 16,
                  cursor: "pointer",
                  opacity: 0.85,
                }}
              >
                Reset
              </button>

              {error && (
                <p style={{ marginTop: 12, opacity: 0.9 }}>
                  <strong>Error:</strong> {error}
                </p>
              )}

              {result && (
                <div
                  aria-live="polite"
                  style={{
                    marginTop: 14,
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.15)",
                  }}
                >
                  <h2 style={{ margin: "0 0 6px 0", fontSize: 20 }}>{result.title}</h2>
                  <p style={{ margin: 0, opacity: 0.9 }}>{result.blurb}</p>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </main>
  );
}
