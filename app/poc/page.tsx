"use client";

import { useEffect, useState } from "react";

type Question = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
};

export default function POCPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ title: string; blurb: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/recommend", { method: "GET" });
      const data = await res.json();
      setQuestions(data.questions ?? []);
    })();
  }, []);

  async function onSubmit() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();
    setResult(data.result ?? null);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1>POC Quiz</h1>
      <p>Two questions, one verdict. No appeals (okay, one appeal).</p>

      {questions.map((q) => (
        <div key={q.id} style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12, marginTop: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>{q.label}</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {q.options.map((opt) => (
              <label key={opt.value} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt.value}
                  checked={answers[q.id] === opt.value}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={onSubmit}
        disabled={loading || questions.some((q) => !answers[q.id])}
        style={{
          marginTop: 20,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #111",
          background: loading ? "#eee" : "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 600,
        }}
      >
        {loading ? "Thinking..." : "Get recommendation"}
      </button>

      {result && (
        <div style={{ marginTop: 24, padding: 16, borderRadius: 12, border: "1px solid #ddd" }}>
          <h2 style={{ margin: 0 }}>{result.title}</h2>
          <p style={{ marginBottom: 0 }}>{result.blurb}</p>
        </div>
      )}
    </main>
  );
}
