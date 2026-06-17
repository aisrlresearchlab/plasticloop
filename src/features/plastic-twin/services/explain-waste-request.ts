import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import type {
  ExplainabilityRequest,
  ExplainabilityResult,
} from "@/features/plastic-twin/types";

type ApiErrorResponse = {
  message?: string;
};

export async function explainWasteRequest(
  payload: ExplainabilityRequest,
): Promise<ExplainabilityResult> {
  try {
    const response = await api.post<ExplainabilityResult>("/api/ai/explain", payload);
    return response.data;
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      throw new Error(
        error.response?.data?.message ?? "Failed to generate explanation with Gemini.",
      );
    }

    throw error;
  }
}
