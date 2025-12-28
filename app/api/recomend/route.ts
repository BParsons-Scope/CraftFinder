import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Read the env var
    const raw = process.env.SECRET_RULES_JSON;
    if (!raw) {
      return NextResponse.json(
        { error: "Missing SECRET_RULES_JSON" },
        { status: 500 }
      );
    }

    const rules = JSON.parse(raw);

    // TEMP response — just to prove it works
    return NextResponse.json({
      ok: true,
      rulesVersion: rules.version ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
