// app/result/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QUESTIONS, QUIZ_FLOW } from "../lib/quiz/questions";
import styles from "./result.module.css";

type StoredPayload = {
  responses: Record<string, string[]>;
};
  
function safeParse(raw: string | null): StoredPayload | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredPayload>;
    return { responses: parsed.responses ?? {} };
  } catch {
    return null;
  }
}

function labelForOptionId(optionId: string): string {
  for (const q of QUESTIONS) {
    const opt = q.options.find((o) => o.id === optionId);
    if (opt) return opt.label;
  }
  return optionId;
}

function firstLabel(payload: StoredPayload, questionId: string): string | null {
  const ids = payload.responses[questionId];
  if (!ids || ids.length === 0) return null;
  return labelForOptionId(ids[0]);
}

function manyLabels(payload: StoredPayload, questionId: string): string[] {
  const ids = payload.responses[questionId] ?? [];
  return ids.map(labelForOptionId);
}

function buildCrafterStyle(payload: StoredPayload): string {
  // Pull a few “high signal” answers. If missing, we just omit that clause.
  const where = firstLabel(payload, "where_craft");
  const space = firstLabel(payload, "space");
  const social = firstLabel(payload, "social");
  const computers = firstLabel(payload, "computers");

  const mess = firstLabel(payload, "mess");
  const sensory = manyLabels(payload, "sensory_avoid");
  const tools = firstLabel(payload, "tools_danger");

  const workStyle = firstLabel(payload, "work_style");
  const duration = firstLabel(payload, "duration");

  const perfection = firstLabel(payload, "perfection");
  const style = firstLabel(payload, "style");
  const output = firstLabel(payload, "outputs");

  // Build a sentence that reads like a “crafter style” blurb.
  // Intentional vibe: observant, lightly playful, not too specific.
  const parts: string[] = [];

  if (where || space) {
    const p = `You’re most likely crafting ${where ? where.toLowerCase() : "wherever you land"}${space ? `, with ${space.toLowerCase()}` : ""}.`;
    parts.push(p);
  }

  if (workStyle || duration) {
    parts.push(
      `Your rhythm leans ${workStyle ? workStyle.toLowerCase() : "towards whatever fits the moment"}${duration ? `, and you’re happy for a project to be ${duration.toLowerCase()}` : ""}.`
    );
  }

  if (mess || tools || sensory.length > 0) {
    const sensoryBit =
      sensory.length > 0 ? `You’d rather avoid ${sensory.map((s) => s.toLowerCase()).join(", ")}.` : null;

    parts.push(
      `You prefer things ${mess ? mess.toLowerCase() : "that don’t derail your space"}${tools ? `, and your tool comfort level is: ${tools.toLowerCase()}` : ""}.`
    );

    if (sensoryBit) parts.push(sensoryBit);
  }

  if (social || computers) {
    parts.push(
      `${social ? social : "You’ve got a clear vibe about how social this should be"}${computers ? ` — and for tech, you said: ${computers.toLowerCase()}` : "."}`
    );
  }

  if (style || perfection || output) {
    const trio: string[] = [];
    if (style) trio.push(`style: ${style.toLowerCase()}`);
    if (perfection) trio.push(`finish: ${perfection.toLowerCase()}`);
    if (output) trio.push(`purpose: ${output.toLowerCase()}`);

    if (trio.length) parts.push(`Overall: ${trio.join(" · ")}.`);
  }

  // Fallback if everything is skipped
  if (parts.length === 0) {
    return "You’re an enigma wrapped in a craft project — which is honestly a strong brand. Try answering a couple of questions and we’ll reflect it back here.";
  }

  // Make it one paragraph (not a list), and avoid double spaces.
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export default function ResultPage() {
  const [payload, setPayload] = useState<StoredPayload | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("craftfinder_responses_v1");
    setPayload(safeParse(raw));
  }, []);

  const stats = useMemo(() => {
    if (!payload) return { captured: 0, answered: 0, skipped: 0 };

    const captured = QUIZ_FLOW.length;

    const answered = QUIZ_FLOW.filter((qid) => (payload.responses[qid] ?? []).length > 0).length;
    const skipped = captured - answered;

    return { captured, answered, skipped };
  }, [payload]);

  const crafterStyle = useMemo(() => {
    if (!payload) return "";
    return buildCrafterStyle(payload);
  }, [payload]);

  // For debugging/testing: reflect answers (labels) in a hidden section
  const reflected = useMemo(() => {
    if (!payload) return [];
    return QUIZ_FLOW.map((qid) => {
      const q = QUESTIONS.find((x) => x.id === qid);
      const optionIds = payload.responses[qid] ?? [];
      const labels = optionIds.map(labelForOptionId);
      return {
        questionId: qid,
        prompt: q?.prompt ?? qid,
        labels,
      };
    });
  }, [payload]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Your Crafter Style</h1>
        <p className={styles.subtle}>
          MVP placeholder: for now we’re reflecting your vibe back — soon this will drive real recommendations.
        </p>
      </header>

      {!payload ? (
        <div className={styles.cardMuted}>
          No saved quiz answers found. Take the quiz first, or hit “Retake quiz”.
        </div>
      ) : (
        <>
          <section className={styles.grid}>
            <StatCard label="Signals available" value={stats.captured} />
            <StatCard label="Signals collected" value={stats.answered} />
            <StatCard label="Skipped" value={stats.skipped} />
          </section>

          <section className={styles.crafterStyle}>
            <div className={styles.crafterKicker}>Crafter style</div>
            <p className={styles.crafterSentence}>{crafterStyle}</p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Placeholder recommendations</h2>
            <p className={styles.subtle}>
              These are layout dummies — your secret-sauce scoring will slot in here later.
            </p>

            <div className={styles.tilesGrid}>
              <PlaceholderTile
                title="Mini watercolour postcards"
                blurb="Low-setup, lounge-friendly, and a nice little giftable output."
                tag="Quick win"
              />
              <PlaceholderTile
                title="Sashiko mending"
                blurb="Cosy, rhythmic stitching with a practical result (and mild smugness)."
                tag="Useful + calming"
              />
              <PlaceholderTile
                title="Air-dry clay trinket dish"
                blurb="Satisfying in one sitting, and very ‘I made this!’."
                tag="One session"
              />
              <PlaceholderTile
                title="Digital collage print"
                blurb="If screens are allowed, this one’s pure vibes with minimal mess."
                tag="Digital"
              />
            </div>
          </section>

          <details className={styles.details}>
            <summary className={styles.summary}>Debug: what you told us (labels)</summary>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
              {reflected.map((r) => (
                <div key={r.questionId} className={styles.card}>
                  <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>{r.prompt}</div>
                  {r.labels.length === 0 ? (
                    <div style={{ fontSize: 14, opacity: 0.7, fontStyle: "italic" }}>Skipped</div>
                  ) : (
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {r.labels.map((label, idx) => (
                        <li key={`${r.questionId}_${idx}`} style={{ fontSize: 14 }}>
                          {label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>Debug: raw payload (IDs)</summary>
            <pre className={styles.pre}>{JSON.stringify(payload, null, 2)}</pre>
          </details>
        </>
      )}

      <footer className={styles.footer}>
        <Link href="/quiz" className={styles.primaryLink}>
          Retake quiz
        </Link>
        <Link href="/" className={styles.secondaryLink}>
          Home
        </Link>
      </footer>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className={styles.card}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}

function PlaceholderTile({ title, blurb, tag }: { title: string; blurb: string; tag: string }) {
  return (
    <div className={styles.tile}>
      <div className={styles.tileTopRow}>
        <div className={styles.tileTitle}>{title}</div>
        <span className={styles.pill}>{tag}</span>
      </div>
      <p className={styles.tileBlurb}>{blurb}</p>
      <div className={styles.tileNote}>(Placeholder — will be driven by scoring later)</div>
    </div>
  );
}
