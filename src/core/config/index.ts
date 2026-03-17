import "dotenv/config";
import type { ClidocConfig } from "../types/index.js";

export function loadConfig(overrides?: Partial<ClidocConfig>): ClidocConfig {
  return {
    provider:
      (overrides?.provider as ClidocConfig["provider"]) ??
      (process.env.CLIDOC_PROVIDER as ClidocConfig["provider"]) ??
      "openai",
    model:
      overrides?.model ?? process.env.CLIDOC_MODEL ?? "gpt-4o",
    outputDir:
      overrides?.outputDir ?? process.env.CLIDOC_OUTPUT_DIR ?? "docs",
  };
}
