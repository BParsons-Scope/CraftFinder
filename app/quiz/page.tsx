// app/quiz/page.tsx
import Link from "next/link";

export default function QuizPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Craft Finder</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Question 1 of 1 — we’re keeping it delightfully tiny for v0.
      </p>

      <section
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 12,
        }}
      >
        <h2 style={{ fontSize: 22, marginTop: 0 }}>
          Do you like making a bit of a mess?
        </h2>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          <Link
            href="/result?answer=messy"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.2)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Yes — chaos is a feature
          </Link>

          <Link
            href="/result?answer=tidy"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.2)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            No — I prefer tidy joy
          </Link>
        </div>

        <p style={{ marginTop: 16, opacity: 0.8 }}>
          Next step: add 8–12 questions and real scoring. For now, we’re just proving the
          flow works end-to-end.
        </p>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/" style={{ opacity: 0.8 }}>
          ← Back to home
        </Link>
      </p>
    </main>
  );
}
