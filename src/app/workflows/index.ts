import type { CommandType, ClidocConfig } from "../../core/types/index.js";
import { collectContext } from "../../core/context/index.js";
import { createProvider } from "../../core/llm/index.js";
import { getPromptTemplate } from "../templates/index.js";
import { validateDoc } from "../validators/index.js";
import { renderMarkdown } from "../../core/markdown/index.js";
import { writeDoc, updateIndex } from "../../core/files/index.js";

export async function runCommand(
  command: CommandType,
  config: ClidocConfig,
  userNote?: string
): Promise<string> {
  // 1. Collect context
  const context = collectContext(command, userNote);

  if (
    !context.stagedDiff &&
    !context.unstagedDiff &&
    context.recentCommits.length === 0
  ) {
    throw new Error(
      "No git context found. Make sure you're in a git repository with recent changes."
    );
  }

  // 2. Build prompt
  const instructions = getPromptTemplate(command);
  const payload = { command, context, instructions };

  // 3. Call LLM
  const provider = createProvider(config);
  let doc = await provider.generateDocumentation(payload);

  // 4. Validate
  doc = validateDoc(doc);

  // 5. Render markdown
  const markdown = renderMarkdown(doc, command);

  // 6. Write file
  const filepath = await writeDoc(config.outputDir, command, doc.title, markdown);

  // 7. Update index
  await updateIndex(config.outputDir, command, doc.title, filepath);

  return filepath;
}
