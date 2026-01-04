// app/quiz/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, QUIZ_FLOW } from "../lib/quiz/questions";
import type { QuestionDef, ResponseMap } from "../lib/quiz/types";

function getQuestionById(id: string): QuestionDef {
  const q = QUESTIONS.find((x) => x.id === id);
  if (!q) throw new Error(`Missing question: ${id}`);
  return q;
}

export default function QuizPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [committed, setCommitted] = useState<ResponseMap>({});

  const questionId = QUIZ_FLOW[step];
  const q = useMemo(() => getQuestionById(questionId), [questionId]);

  const committedForThisQ = committed[q.id] ?? [];

  const isLast = step === QUIZ_FLOW.length - 1;

  const onCommitAndNext = (optionIds: string[]) => {
    setCommitted((prev) => ({ ...prev, [q.id]: optionIds }));

    if (isLast) {
      // MVP: store results in sessionStorage and go to /result
      sessionStorage.setItem("craftfinder_responses_v1", JSON.stringify({ responses: { ...committed, [q.id]: optionIds } }));
      router.push("/result");
      return;
    }

    setStep((s) => Math.min(QUIZ_FLOW.length - 1, s + 1));
  };

  const onBack = () => setStep((s) => Math.max(0, s - 1));

  return (
    <QuizScreen
      key={q.id}
      q={q}
      step={step}
      totalSteps={QUIZ_FLOW.length}
      initialSelection={committedForThisQ}
      committed={committed}   
      onBack={onBack}
      onNext={onCommitAndNext}
      isLast={isLast}
    />
  );
}

function QuizScreen({
  q,
  step,
  totalSteps,
  initialSelection,
  committed,
  onBack,
  onNext,
  isLast,
}: {
  q: QuestionDef;
  step: number;
  totalSteps: number;
  initialSelection: string[];
  committed: ResponseMap;        // 👈 add this
  onBack: () => void;
  onNext: (optionIds: string[]) => void;
  isLast: boolean;
}) {

  // Draft selection: user can fiddle here without committing until Next.
  const [draft, setDraft] = useState<string[]>(initialSelection);

    // --- Swipe handling (left = Next, right = Back) ---
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    setTouchStartX(t.clientX);
    setTouchStartY(t.clientY);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    // Ignore mostly-vertical gestures (scroll)
    if (Math.abs(dy) > Math.abs(dx)) return;

    const SWIPE_THRESHOLD = 60; // px

    if (dx <= -SWIPE_THRESHOLD) {
      // swipe left -> Next (commit)
      onNext(draft);
    } else if (dx >= SWIPE_THRESHOLD) {
      // swipe right -> Back (no commit)
      onBack();
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  
  const toggle = (optionId: string) => {
    if (q.type === "single") {
      setDraft((prev) => (prev[0] === optionId ? [] : [optionId]));
      return;
    }
    setDraft((prev) => (prev.includes(optionId) ? prev.filter((x) => x !== optionId) : [...prev, optionId]));
  };

  const selected = (id: string) => draft.includes(id);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        padding: 16,
        gap: 12,
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        Question {step + 1} of {totalSteps}
      </div>

      <h1 style={{ fontSize: 22, lineHeight: 1.2, margin: 0 }}>{q.prompt}</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        {q.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            style={{
              textAlign: "left",
              padding: 14,
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.15)",
              background: selected(opt.id) ? "rgba(0,0,0,0.06)" : "white",
              fontSize: 16,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "auto", display: "flex", gap: 10 }}>
        <button
          onClick={onBack}
          disabled={step === 0}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "white",
          }}
        >
          Back
        </button>

        <button
          onClick={() => onNext(draft)}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "black",
            color: "white",
            fontWeight: 600,
          }}
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>

<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <button
    onClick={() => onNext([])}
    style={{
      padding: 10,
      border: "none",
      background: "transparent",
      textDecoration: "underline",
      opacity: 0.7,
    }}
  >
    Skip this question
  </button>

  <button
    onClick={() => onNext(draft)}
    style={{
      padding: "10px 14px",
      borderRadius: 999,
      border: "none",
      background:
        "linear-gradient(135deg, #ff7a18, #ffb347, #7afcff)",
      color: "#000",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      alignSelf: "center",
    }}
  >
    ✨ End quiz now
  </button>
</div>

    </main>

    <main
  onTouchStart={onTouchStart}
  onTouchEnd={onTouchEnd}
  style={{ ... }}
>

  );
}
