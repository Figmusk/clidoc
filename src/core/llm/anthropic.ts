import Anthropic from "@anthropic-ai/sdk";
import type { LLMProvider, PromptPayload, StructuredDoc } from "../types/index.js";
import { parseResponse } from "./parse.js";

export class AnthropicProvider implements LLMProvider {
  private client: Anthropic;
  private model: string;

  constructor(model: string) {
    this.client = new Anthropic();
    this.model = model;
  }

  async generateDocumentation(input: PromptPayload): Promise<StructuredDoc> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 2048,
      system: input.instructions,
      messages: [
        { role: "user", content: JSON.stringify(input.context) },
      ],
    });

    const block = response.content[0];
    const raw = block.type === "text" ? block.text : "";
    return parseResponse(raw);
  }
}
