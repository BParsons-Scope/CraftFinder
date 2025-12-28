import { NextResponse } from "next/server";

type Rules = {
  version: number;
  questions: Array<{
    id: string;
    label: string;
    options: Array<{ value: string; label: string }>;
  }>;
  mapping: Array<{
    when: Record<string, string>;
    result: { title: string; blurb: string };
  }>;
};

function getRules(): Rules {
  const raw = process.env.SECRET_RULES_JSON;
  if (!raw) throw new Error("Missing SECRET_RULES_JSON");
  return JSON.parse(raw) as Rules;
}

export async function GET() {
  try {
    const rules = getRules();
    // Only return what's needed to render the form
    return NextResponse.json(
      { version: rules.version, questions: rules.questions },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const rules = getRules();
    const body = (await req.json()) as { answers?: Record<string, string> };

    const answers = body.answers ?? {};
    // Find first mapping that matches all conditions
    const match = rules.mapping.find((m) =>
      Object.entries(m.when).every(([qid, val]) => answers[qid] === val)
    );

    const result =
      match?.result ?? {
        title: "Unclassified Legend",
        blurb: "You’ve found a combo we didn’t anticipate. Respect.",
      };

    return NextResponse.json({ result }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
