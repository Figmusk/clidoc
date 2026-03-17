export type CommandType = "document" | "decision" | "update" | "review";

export type ContextPayload = {
  command: CommandType;
  branch: string;
  recentCommits: string[];
  stagedDiff: string;
  unstagedDiff: string;
  userNote?: string;
};

export type StructuredDoc = {
  title: string;
  summary: string;
  changes: string[];
  decisions?: string[];
  reasoning?: string[];
  nextSteps?: string[];
};

export type PromptPayload = {
  command: CommandType;
  context: ContextPayload;
  instructions: string;
};

export interface LLMProvider {
  generateDocumentation(input: PromptPayload): Promise<StructuredDoc>;
}

export type ClidocConfig = {
  provider: "openai" | "anthropic";
  model: string;
  outputDir: string;
};
