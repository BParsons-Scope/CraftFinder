// app/result/page.tsx
import Link from "next/link";

type SearchParams = {
  answer?: string;
};

function getResult(answer: string | undefined) {
  const isMessy = answer === "messy";

  if (isMessy) {
    return {
      personaName: "The Joyful Chaos Crafter",
      blurb:
        "You’re happiest when you can dive in, experiment, and let the materials do their thing. Perfection is optional; curiosity is mandatory.",
      project: "Try: air-dry clay trinket dish (fast, satisfying, mildly chaotic).",
      affiliateLabel: "Starter kit idea",
      affiliateUrl: "#", // replace later with an affiliate link
    };
  }

  return {
    personaName: "The Calm Precision Maker",
    blurb:
      "You love clear steps, clean edges, and the quiet satisfaction of a tidy finish. Your craft space is basically a tiny design studio.",
    project: "Try: paper quilling greeting card (tidy, portable, very soothing).",
    affiliateLabel: "Starter kit idea",
    affiliateUrl: "#", // replace later with an affiliate link
  };
}

export default function ResultPage({ searchParams }: { searchParams: SearchParams }) {
  const { personaName, blurb, project, affiliateLabel, affiliateUrl } = getResult(
    searchParams.answer
  );

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Your Craft Persona</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        (This is a placeholder result — soon it’ll be a proper personality-test moment.)
      </p>

      <section
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 12,
        }}
      >
        <h2 style={{ fontSize: 24, marginTop: 0 }}>{personaName}</h2>
        <p style={{ lineHeight: 1.6 }}>{blurb}</p>

        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          <p style={{ margin: 0, fontWeight: 600 }}>Suggested first project</p>
          <p style={{ marginTop: 8 }}>{project}</p>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.2)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {affiliateLabel} →
          </a>

          <Link
            href="/quiz"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.2)",
              textDecoration: "none",
              display: "inline-block",
              opacity: 0.9,
            }}
          >
            Retake quiz
          </Link>
        </div>

        <p style={{ marginTop: 16, fontSize: 14, opacity: 0.7 }}>
          Affiliate disclosure (placeholder): Some links may earn a small commission at no
          extra cost to you.
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
