import { z } from "zod";
import type { StructuredDoc } from "../types/index.js";

const StructuredDocSchema = z.object({
  title: z.string(),
  summary: z.string(),
  changes: z.array(z.string()),
  decisions: z.array(z.string()).optional(),
  reasoning: z.array(z.string()).optional(),
  nextSteps: z.array(z.string()).optional(),
});

export function parseResponse(raw: string): StructuredDoc {
  // Try to extract JSON from the response if wrapped in markdown
  let jsonStr = raw;
  const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1]!;
  }

  const parsed = JSON.parse(jsonStr);
  return StructuredDocSchema.parse(parsed);
}
