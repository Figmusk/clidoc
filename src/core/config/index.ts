import "dotenv/config";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createInterface } from "node:readline";
import type { ClidocConfig } from "../types/index.js";

const CONFIG_DIR = join(homedir(), ".clidoc");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

type SavedConfig = {
  provider?: string;
  model?: string;
  apiKey?: string;
};

function readSavedConfig(): SavedConfig {
  try {
    return JSON.parse(readFileSync(CONFIG_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeSavedConfig(config: SavedConfig): void {
  mkdirSync(CONFIG_DIR, { recursive: true });
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
}

async function ask(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export async function ensureApiKey(): Promise<void> {
  // Already set in environment
  if (process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY) return;

  // Check saved config
  const saved = readSavedConfig();
  if (saved.apiKey) {
    const envKey =
      saved.provider === "anthropic" ? "ANTHROPIC_API_KEY" : "OPENAI_API_KEY";
    process.env[envKey] = saved.apiKey;
    return;
  }

  // First run — ask the user
  console.log("\n  Welcome to Clidoc!\n");
  console.log("  You need an API key to generate docs.\n");

  const provider = await ask("  Provider (openai/anthropic) [openai]: ");
  const selectedProvider = provider === "anthropic" ? "anthropic" : "openai";

  const keyPrompt =
    selectedProvider === "anthropic"
      ? "  Anthropic API key: "
      : "  OpenAI API key: ";
  const apiKey = await ask(keyPrompt);

  if (!apiKey) {
    console.error("  No API key provided. Exiting.");
    process.exit(1);
  }

  // Save for next time
  writeSavedConfig({ provider: selectedProvider, apiKey });

  const envKey =
    selectedProvider === "anthropic" ? "ANTHROPIC_API_KEY" : "OPENAI_API_KEY";
  process.env[envKey] = apiKey;

  if (selectedProvider !== "openai") {
    process.env.CLIDOC_PROVIDER = selectedProvider;
  }

  console.log("\n  Saved! You won't be asked again.\n");
}

export function loadConfig(overrides?: Partial<ClidocConfig>): ClidocConfig {
  const saved = readSavedConfig();

  return {
    provider:
      (overrides?.provider as ClidocConfig["provider"]) ??
      (process.env.CLIDOC_PROVIDER as ClidocConfig["provider"]) ??
      (saved.provider as ClidocConfig["provider"]) ??
      "openai",
    model:
      overrides?.model ?? process.env.CLIDOC_MODEL ?? "gpt-4o",
    outputDir:
      overrides?.outputDir ?? process.env.CLIDOC_OUTPUT_DIR ?? "docs",
  };
}
