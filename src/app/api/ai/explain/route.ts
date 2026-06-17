import { NextResponse } from "next/server";

import {
  GeminiConfigurationError,
  generateGeminiContent,
  parseJsonObject,
} from "@/lib/gemini";
import type {
  ExplainabilityRequest,
  ExplainabilityResult,
} from "@/features/plastic-twin/types";

export const runtime = "nodejs";

function isExplainabilityRequest(value: unknown): value is ExplainabilityRequest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return typeof record.context === "string" && record.context.trim().length > 0;
}

function isExplainabilityResult(value: unknown): value is ExplainabilityResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.summary === "string" &&
    Array.isArray(record.recommendations) &&
    record.recommendations.every((item) => typeof item === "string")
  );
}

export async function POST(request: Request) {
  const body: unknown = await request.json();

  if (!isExplainabilityRequest(body)) {
    return NextResponse.json(
      { message: "Invalid explainability payload." },
      { status: 400 },
    );
  }

  try {
    const text = await generateGeminiContent(
      [
        {
          text: [
            "You are an explainable AI assistant for campus plastic waste analytics.",
            "Use the provided context to produce JSON only with this schema:",
            "{",
            '  "summary": "short explanation",',
            '  "recommendations": ["action 1", "action 2", "action 3"]',
            "}",
            "Context:",
            body.context,
          ].join("\n"),
        },
      ],
      {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    );

    return NextResponse.json(parseJsonObject(text, isExplainabilityResult));
  } catch (error) {
    if (error instanceof GeminiConfigurationError) {
      return NextResponse.json(
        {
          message:
            "Gemini API key belum dikonfigurasi. Tambahkan GEMINI_API_KEY di environment.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to generate explanation with Gemini.",
      },
      { status: 500 },
    );
  }
}
