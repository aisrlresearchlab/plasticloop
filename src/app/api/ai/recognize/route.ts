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

type RawRecognitionResult = Omit<
  AiRecognitionResult,
  "confidence" | "recyclability"
> & {
  confidence: number | string;
  recyclability: string;
};

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

function isRawRecognitionResult(value: unknown): value is RawRecognitionResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.plasticType === "string" &&
    typeof record.material === "string" &&
    (typeof record.confidence === "number" ||
      typeof record.confidence === "string") &&
    typeof record.recyclability === "string" &&
    typeof record.estimatedPurity === "string" &&
    typeof record.suggestedBin === "string" &&
    typeof record.environmentalImpact === "string"
  );
}

function normalizeRecyclability(value: string): AiRecognitionResult["recyclability"] {
  const normalizedValue = value.trim().toLowerCase();

  if (normalizedValue.includes("high")) {
    return "High";
  }

  if (normalizedValue.includes("medium")) {
    return "Medium";
  }

  return "Low";
}

function normalizeConfidence(value: number | string) {
  const confidence =
    typeof value === "number" ? value : Number.parseFloat(value.replace("%", ""));

  if (!Number.isFinite(confidence)) {
    throw new Error("Gemini confidence value was not a valid number.");
  }

  return Math.min(Math.max(Math.round(confidence * 10) / 10, 0), 100);
}

function normalizeRecognitionResult(
  value: RawRecognitionResult,
): AiRecognitionResult {
  return {
    plasticType: value.plasticType,
    material: value.material,
    confidence: normalizeConfidence(value.confidence),
    recyclability: normalizeRecyclability(value.recyclability),
    estimatedPurity: value.estimatedPurity,
    suggestedBin: value.suggestedBin,
    environmentalImpact: value.environmentalImpact,
  };
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
            "All fields must be inferred from the image and your visual analysis.",
            "Do not use placeholder values or examples if the image shows a different item.",
            'Use a specific resin-code style plasticType when possible, for example "PET (Type 1)".',
            'Use a specific material name when possible, for example "Polyethylene Terephthalate".',
            "The confidence field must represent your AI confidence for this image.",
            'The estimatedPurity field should describe visible purity evidence, for example "High (clear PET body, separate cap and label)".',
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

    const rawResult = parseJsonObject(text, isRawRecognitionResult);

    return NextResponse.json(normalizeRecognitionResult(rawResult));
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
