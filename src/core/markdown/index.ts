import type { StructuredDoc, CommandType } from "../types/index.js";

function renderList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function renderSection(heading: string, items?: string[]): string {
  if (!items || items.length === 0) return "";
  return `\n## ${heading}\n${renderList(items)}\n`;
}

export function renderMarkdown(
  doc: StructuredDoc,
  command: CommandType
): string {
  const date = new Date().toISOString().split("T")[0];
  const typeLabel: Record<CommandType, string> = {
    document: "Session Log",
    decision: "Decision Record",
    update: "Progress Update",
    review: "Review Summary",
  };

  let md = `# ${date} – ${typeLabel[command]}\n`;
  md += `\n> ${doc.title}\n`;
  md += `\n## Summary\n${doc.summary}\n`;
  md += renderSection("Changes", doc.changes);
  md += renderSection("Decisions", doc.decisions);
  md += renderSection("Reasoning", doc.reasoning);
  md += renderSection("Next Steps", doc.nextSteps);

  return md;
}
