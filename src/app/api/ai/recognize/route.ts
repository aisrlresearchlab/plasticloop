import { NextResponse } from "next/server";

import {
  GeminiConfigurationError,
  generateGeminiContent,
  parseJsonObject,
} from "@/lib/gemini";
import type {
  AiRecognitionRequest,
  AiRecognitionResult,
} from "@/features/plastic-twin/types";

export const runtime = "nodejs";

function isRecognitionRequest(value: unknown): value is AiRecognitionRequest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.imageBase64 === "string" &&
    record.imageBase64.length > 0 &&
    typeof record.mimeType === "string" &&
    record.mimeType.startsWith("image/")
  );
}

function isRecognitionResult(value: unknown): value is AiRecognitionResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.plasticType === "string" &&
    typeof record.material === "string" &&
    typeof record.confidence === "number" &&
    ["Low", "Medium", "High"].includes(String(record.recyclability)) &&
    typeof record.estimatedPurity === "string" &&
    typeof record.suggestedBin === "string" &&
    typeof record.environmentalImpact === "string"
  );
}

export async function POST(request: Request) {
  const body: unknown = await request.json();

  if (!isRecognitionRequest(body)) {
    return NextResponse.json(
      { message: "Invalid image payload." },
      { status: 400 },
    );
  }

  try {
    const text = await generateGeminiContent(
      [
        {
          text: [
            "Analyze this waste item image for a campus plastic waste dashboard.",
            "Return JSON only with this exact schema:",
            "{",
            '  "plasticType": "string",',
            '  "material": "string",',
            '  "confidence": number between 0 and 100,',
            '  "recyclability": "Low" | "Medium" | "High",',
            '  "estimatedPurity": "string",',
            '  "suggestedBin": "string",',
            '  "environmentalImpact": "string"',
            "}",
            "Be concise and do not include markdown.",
          ].join("\n"),
        },
        {
          inline_data: {
            mime_type: body.mimeType,
            data: body.imageBase64,
          },
        },
      ],
      {
        temperature: 0.1,
        responseMimeType: "application/json",
      },
    );

    return NextResponse.json(parseJsonObject(text, isRecognitionResult));
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
            : "Failed to analyze image with Gemini.",
      },
      { status: 500 },
    );
  }
}
