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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [expanded, setExpanded] = useState(false);

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!expanded || questions.length > 0) return;

    (async () => {
      setLoadingQuestions(true);
      try {
        const res = await fetch("/api/recommend", { method: "GET" });
        if (!res.ok) throw new Error("Failed to load questions");
        const data = await res.json();
        setQuestions(data.questions ?? []);
      } catch (err) {
        console.error(err);
        alert("Couldn’t load questions. Check your /api/recommend GET endpoint.");
      } finally {
        setLoadingQuestions(false);
      }
    })();
  }, [expanded, questions.length]);

  const canSubmit =
    questions.length > 0 && questions.every((q) => Boolean(answers[q.id])) && !submitting;

  async function onSubmit() {
    setSubmitting(true);
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
    } catch (err: any) {
      console.error(err);
      alert(err?.message ?? "Something went wrong submitting your answers.");
    } finally {
      setSubmitting(false);
    }
  }
  

  return (
    <main style={{ maxWidth: 720, margin: "clamp(20px, 6vh, 60px) auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>Find Your Next Craft</h1>

      <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.9 }}>
        Not sure what to make next? Answer a few quick questions and we’ll match you
        with a crafting style and a project that actually fits your space, energy,
        and tolerance for chaos.
      </p>

      <section
        style={{
          marginTop: 32,
          padding: 20,
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 14,
        }}
      >
        <h2 style={{ fontSize: 22, marginTop: 0 }}>Takes about 1 minute</h2>

        <ul style={{ paddingLeft: 20, lineHeight: 1.6, opacity: 0.85 }}>
          <li>No login</li>
          <li>No judgement</li>
          <li>Maximum crafting joy</li>
        </ul>

        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            style={{
              marginTop: 16,
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.3)",
              background: "white",
              textDecoration: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Start the quiz →
          </button>
        ) : (
          <div style={{ marginTop: 16 }}>
            {loadingQuestions ? (
              <p style={{ opacity: 0.8 }}>Loading questions…</p>
            ) : (
              <>
                {questions.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      padding: 16,
                      border: "1px solid rgba(0,0,0,0.12)",
                      borderRadius: 12,
                      marginTop: 12,


                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>{q.label}</div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <div style={{ fontSize: 16 }}>
                        {q.options.map((opt) => (
                          <label
                            key={opt.value}
                            style={{
                              display: "flex",
                              gap: 10,
                              alignItems: "center",
                              padding: "10px 12px",
                              border: "1px solid rgba(0,0,0,0.15)",
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
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>

                ))}

                <button
                  onClick={onSubmit}
                  disabled={!canSubmit}
                  style={{
                    marginTop: 16,
                    display: "inline-block",
                    padding: "12px 18px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.3)",
                    background: canSubmit ? "white" : "rgba(0,0,0,0.04)",
                    fontWeight: 600,
                    cursor: canSubmit ? "pointer" : "not-allowed",
                  }}
                >
                  {submitting ? "Thinking…" : "Get recommendation"}
                </button>

                {result && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: 16,
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    <h3 style={{ margin: 0 }}>{result.title}</h3>
                    <p style={{ marginBottom: 0, opacity: 0.9 }}>{result.blurb}</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setExpanded(false);
                    setAnswers({});
                    setResult(null);
                    // keep questions cached so reopening is instant
                  }}
                  style={{
                    marginTop: 12,
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.2)",
                    background: "transparent",
                    cursor: "pointer",
                    opacity: 0.85,
                  }}
                >
                  Reset
                </button>
              </>
            )}
          </div>
        )}
      </section>

      <footer style={{ marginTop: 48, fontSize: 14, opacity: 0.7 }}>
        <p>Built as a friendly experiment in helping people make things.</p>
      </footer>
    </main>
  );
}
