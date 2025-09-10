import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface GenerateBody {
  imageUrl?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateBody;
    if (!body?.imageUrl) {
      return NextResponse.json(
        { error: "imageUrl is required" },
        { status: 400 }
      );
    }

    // TODO: Wire Vercel AI SDK here in later step.
    // For now, echo payload to validate client wiring.
    return NextResponse.json({
      ok: true,
      received: { imageUrl: body.imageUrl },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
