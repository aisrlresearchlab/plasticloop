import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import type {
  AiRecognitionRequest,
  AiRecognitionResult,
} from "@/features/plastic-twin/types";

type ApiErrorResponse = {
  message?: string;
};

export async function recognizePlasticRequest(
  payload: AiRecognitionRequest,
): Promise<AiRecognitionResult> {
  try {
    const response = await api.post<AiRecognitionResult>("/api/ai/recognize", payload);
    return response.data;
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      throw new Error(
        error.response?.data?.message ?? "Failed to analyze image with Gemini.",
      );
    }

    throw error;
  }
}
