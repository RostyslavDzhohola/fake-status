import { NextRequest, NextResponse } from "next/server";

import { generateText } from "ai";

export const runtime = "nodejs";

interface GenerateBody {
  imageUrl?: string;
  prompt?: string;
}

export async function POST(req: NextRequest) {
  // Parse request JSON defensively to distinguish 400 vs provider errors
  let body: GenerateBody | null = null;
  try {
    body = (await req.json()) as GenerateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const prompt =
      body?.prompt?.trim() ||
      "Photoreal portrait on a yacht at golden hour, shallow DOF, teak deck, chrome rail, turquoise water bokeh";

    const model =
      (process.env.IMAGE_MODEL && process.env.IMAGE_MODEL.trim()) ||
      "google/gemini-2.5-flash-image-preview";

    const result = await generateText({
      model,
      prompt,
      providerOptions: {
        // Ask Gemini to return an IMAGE file in the response
        google: { responseModalities: ["IMAGE"] },
      },
    });

    // Prefer image files returned by Gemini over textual output
    let dataUrl = "";
    const imageFile = Array.isArray(result.files)
      ? result.files.find(
          (f) =>
            typeof f.mediaType === "string" && f.mediaType.startsWith("image/")
        )
      : undefined;

    if (imageFile) {
      const mediaType = imageFile.mediaType || "image/png";
      const base64 = (imageFile as unknown as { base64?: string }).base64;
      if (typeof base64 === "string" && base64.length > 0) {
        dataUrl = base64.startsWith("data:")
          ? base64
          : `data:${mediaType};base64,${base64}`;
      } else {
        const uint8 = (imageFile as unknown as { uint8Array?: Uint8Array })
          .uint8Array;
        if (uint8 && uint8 instanceof Uint8Array) {
          dataUrl = `data:${mediaType};base64,${Buffer.from(uint8).toString(
            "base64"
          )}`;
        }
      }
    }

    // Fallback: attempt to coerce the textual result into an image if provider didn't return files
    if (!dataUrl) {
      const value: unknown = (result as unknown as { text?: unknown }).text;
      if (typeof value === "string") {
        const str = value as string;
        dataUrl = str.startsWith("data:")
          ? str
          : `data:image/png;base64,${str}`;
      } else if (value instanceof Uint8Array) {
        dataUrl = `data:image/png;base64,${Buffer.from(value).toString(
          "base64"
        )}`;
      } else if (Array.isArray(value)) {
        dataUrl = `data:image/png;base64,${Buffer.from(
          value as number[]
        ).toString("base64")}`;
      } else if (hasArrayBuffer(value)) {
        const ab = await value.arrayBuffer();
        dataUrl = `data:image/png;base64,${Buffer.from(
          new Uint8Array(ab)
        ).toString("base64")}`;
      } else if (value != null) {
        dataUrl = `data:image/png;base64,${Buffer.from(String(value)).toString(
          "base64"
        )}`;
      }
    }

    return NextResponse.json({ ok: true, dataUrl });
  } catch (err: unknown) {
    const dev = process.env.NODE_ENV !== "production";
    const info = serializeError(err);

    const fallbackMessage = (info.message as string) || "Generation failed";
    let status = (info.status as number) || 0;
    if (!status) {
      const m = String(fallbackMessage).toLowerCase();
      if (m.includes("api key") || m.includes("permission")) status = 401;
      else status = 500;
    }

    const errorId = `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    // Server-side log with rich context
    console.error("/api/generate error", {
      errorId,
      status,
      env: process.env.NODE_ENV,
      error: info,
    });

    const body = dev
      ? { error: fallbackMessage, errorId, details: info }
      : { error: fallbackMessage, errorId };

    return NextResponse.json(body, {
      status,
      headers: {
        "X-Error-Id": errorId,
        "Cache-Control": "no-store",
      },
    });
  }
}

// ----------------------------------------
// Helpers (moved to bottom)
// ----------------------------------------

function hasArrayBuffer(
  value: unknown
): value is { arrayBuffer: () => Promise<ArrayBuffer> } {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in (value as object) &&
    typeof (value as { arrayBuffer?: unknown }).arrayBuffer === "function"
  );
}

// Turns unknown errors into a safe, serializable object for logging/response
function serializeError(err: unknown): Record<string, unknown> {
  const e = err as {
    name?: string;
    message?: string;
    stack?: string;
    code?: unknown;
    status?: unknown;
    response?: { status?: unknown; data?: unknown; body?: unknown };
    cause?: unknown;
    provider?: unknown;
    type?: unknown;
  };

  const statusFromErr =
    (typeof e.status === "number" && e.status) ||
    (typeof e.response?.status === "number" && e.response.status) ||
    undefined;

  const result: Record<string, unknown> = {
    name: typeof e.name === "string" ? e.name : undefined,
    message: typeof e.message === "string" ? e.message : String(err),
    code:
      typeof e.code === "string" || typeof e.code === "number"
        ? e.code
        : undefined,
    status: statusFromErr,
    provider: e.provider,
    type: e.type,
    responseBody: e.response?.data ?? e.response?.body,
    stack: typeof e.stack === "string" ? e.stack : undefined,
  };

  if (e.cause && typeof e.cause === "object") {
    result.cause = serializeError(e.cause);
  }

  return result;
}
