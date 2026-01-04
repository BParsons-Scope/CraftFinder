// app/api/recommend/route.ts
import { NextResponse } from "next/server";
import { QUESTIONS, QUIZ_FLOW } from "@/app/lib/quiz/questions";
import type { ResponseMap } from "@/app/lib/quiz/types";

type ScoringRules = {
  version: number;
  // You decide exact structure based on your Excel export:
  // e.g. optionEffects: Record<optionId, Record<trait, number>>
  //      crafts: Array<{ id, title, blurb, vector... }>
  //      etc
};

function getScoring(): ScoringRules {
  const raw = process.env.SECRET_SCORING_JSON;
  if (!raw) throw new Error("Missing SECRET_SCORING_JSON");
  return JSON.parse(raw) as ScoringRules;
}

export async function GET() {
  // Public UX config only (safe to expose)
  return NextResponse.json(
    { version: 1, flow: QUIZ_FLOW, questions: QUESTIONS },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    const scoring = getScoring();

    const body = (await req.json()) as { responses?: ResponseMap };
    const responses = body.responses ?? {};

    // TODO: apply scoring rules server-side using optionIds
    // return only results (not weights)
    const recommendations = [
      // { craftId, title, blurb, score, reasons?: string[] }
    ];

    return NextResponse.json({ recommendations }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
