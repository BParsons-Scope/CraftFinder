// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 720, margin: "60px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>
        Find Your Next Craft
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.9 }}>
        Not sure what to make next? Answer a few quick questions and we’ll match
        you with a crafting style and a project that actually fits your space,
        energy, and tolerance for chaos.
      </p>

      <section
        style={{
          marginTop: 32,
          padding: 20,
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 14,
        }}
      >
        <h2 style={{ fontSize: 22, marginTop: 0 }}>
          Takes about 1 minute
        </h2>

        <ul style={{ paddingLeft: 20, lineHeight: 1.6, opacity: 0.85 }}>
          <li>No login</li>
          <li>No judgement</li>
          <li>Maximum crafting joy</li>
        </ul>

        <Link
          href="/quiz"
          style={{
            marginTop: 16,
            display: "inline-block",
            padding: "12px 18px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.3)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Start the quiz →
        </Link>
      </section>

      <footer style={{ marginTop: 48, fontSize: 14, opacity: 0.7 }}>
        <p>
          Built as a friendly experiment in helping people make things.
        </p>
      </footer>
    </main>
  );
}
