import type { CommandType } from "../../core/types/index.js";

const DOCUMENT_PROMPT = `You are a documentation assistant for software development sessions.
Given the git context below, generate a structured session log in JSON format.

Output must be valid JSON with this shape:
{
  "title": "short descriptive title of the session",
  "summary": "1-2 sentence overview of what was worked on",
  "changes": ["list of key changes made"],
  "decisions": ["any decisions made, or omit if none are clear"],
  "reasoning": ["why these changes were made, inferred from context"],
  "nextSteps": ["likely next actions based on the work done"]
}

Rules:
- Be concise and specific
- Do not invent details not supported by the context
- If a section has no clear content, omit it or use an empty array
- Output ONLY valid JSON, no markdown wrapping`;

const DECISION_PROMPT = `You are a documentation assistant focused on recording design and product decisions.
Given the git context and user note, generate a structured decision record in JSON format.

Output must be valid JSON with this shape:
{
  "title": "short decision title",
  "summary": "what was decided and why",
  "changes": ["what changed as a result"],
  "decisions": ["the specific decisions made"],
  "reasoning": ["why this decision was made over alternatives"],
  "nextSteps": ["follow-up actions from this decision"]
}

Rules:
- Focus on the decision itself, not the implementation
- Capture the reasoning and trade-offs
- Output ONLY valid JSON, no markdown wrapping`;

const UPDATE_PROMPT = `You are a documentation assistant for quick project progress updates.
Given the git context, generate a brief progress update in JSON format.

Output must be valid JSON with this shape:
{
  "title": "short update title",
  "summary": "brief progress summary",
  "changes": ["what was done"],
  "nextSteps": ["what's coming next"]
}

Rules:
- Keep it brief — this is a quick status note
- Output ONLY valid JSON, no markdown wrapping`;

const REVIEW_PROMPT = `You are a documentation assistant for code review summaries.
Given the git context, generate a review summary in JSON format.

Output must be valid JSON with this shape:
{
  "title": "review summary title",
  "summary": "overview of the current state of work",
  "changes": ["key changes to review"],
  "decisions": ["notable decisions in the code"],
  "reasoning": ["inferred reasoning behind changes"],
  "nextSteps": ["suggested next actions"]
}

Rules:
- Summarize the state of work objectively
- Flag anything that looks incomplete or unclear
- Output ONLY valid JSON, no markdown wrapping`;

const PROMPTS: Record<CommandType, string> = {
  document: DOCUMENT_PROMPT,
  decision: DECISION_PROMPT,
  update: UPDATE_PROMPT,
  review: REVIEW_PROMPT,
};

export function getPromptTemplate(command: CommandType): string {
  return PROMPTS[command];
}
