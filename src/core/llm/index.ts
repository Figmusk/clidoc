import type { ClidocConfig, LLMProvider } from "../types/index.js";
import { OpenAIProvider } from "./openai.js";
import { AnthropicProvider } from "./anthropic.js";

export function createProvider(config: ClidocConfig): LLMProvider {
  switch (config.provider) {
    case "openai":
      return new OpenAIProvider(config.model);
    case "anthropic":
      return new AnthropicProvider(config.model);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}
