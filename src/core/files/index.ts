import { mkdir, writeFile, readFile, appendFile } from "node:fs/promises";
import { join } from "node:path";
import _slugify from "slugify";
const slugify = _slugify as unknown as (str: string, opts?: { lower?: boolean; strict?: boolean }) => string;
import type { CommandType } from "../types/index.js";

const SUBDIR: Record<CommandType, string> = {
  document: "sessions",
  decision: "decisions",
  update: "updates",
  review: "sessions",
};

function generateFilename(title: string): string {
  const date = new Date().toISOString().split("T")[0];
  const slug = slugify(title, { lower: true, strict: true });
  return `${date}-${slug || "session"}.md`;
}

export async function writeDoc(
  outputDir: string,
  command: CommandType,
  title: string,
  content: string
): Promise<string> {
  const subdir = SUBDIR[command];
  const dir = join(outputDir, subdir);
  await mkdir(dir, { recursive: true });

  const filename = generateFilename(title);
  const filepath = join(dir, filename);
  await writeFile(filepath, content, "utf-8");

  return filepath;
}

export async function updateIndex(
  outputDir: string,
  command: CommandType,
  title: string,
  filepath: string
): Promise<void> {
  const indexPath = join(outputDir, "index.md");
  const subdir = SUBDIR[command];
  const relativePath = `./${subdir}/${filepath.split("/").pop()}`;

  const sectionHeading: Record<CommandType, string> = {
    document: "Sessions",
    decision: "Decisions",
    update: "Updates",
    review: "Sessions",
  };

  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const entry = `- [${date} ${time} – ${title}](${relativePath})`;

  let existing = "";
  try {
    existing = await readFile(indexPath, "utf-8");
  } catch {
    existing = "# Clidoc Index\n";
  }

  const heading = sectionHeading[command];
  if (!existing.includes(`## ${heading}`)) {
    existing += `\n## ${heading}\n`;
  }

  const lines = existing.split("\n");
  const headingIndex = lines.findIndex((l) => l === `## ${heading}`);
  lines.splice(headingIndex + 1, 0, entry);

  await writeFile(indexPath, lines.join("\n"), "utf-8");
}

export async function readTimeline(outputDir: string): Promise<string[]> {
  const indexPath = join(outputDir, "index.md");
  try {
    const content = await readFile(indexPath, "utf-8");
    return content
      .split("\n")
      .filter((line) => line.startsWith("- ["))
      .map((line) => {
        const match = line.match(/- \[(.+?)\]\((.+?)\)/);
        if (!match) return line;
        return `  ${match[1]}`;
      });
  } catch {
    return [];
  }
}
