import OpenAI from "openai";
import type { LLMProvider, PromptPayload, StructuredDoc } from "../types/index.js";
import { parseResponse } from "./parse.js";

export class OpenAIProvider implements LLMProvider {
  private client: OpenAI;
  private model: string;

  constructor(model: string) {
    this.client = new OpenAI();
    this.model = model;
  }

  async generateDocumentation(input: PromptPayload): Promise<StructuredDoc> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: input.instructions },
        { role: "user", content: JSON.stringify(input.context) },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const raw = response.choices[0]?.message?.content ?? "";
    return parseResponse(raw);
  }
}
