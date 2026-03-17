import { execSync } from "node:child_process";
import type { ContextPayload, CommandType } from "../types/index.js";

function run(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf-8", maxBuffer: 1024 * 512 }).trim();
  } catch {
    return "";
  }
}

export function collectContext(
  command: CommandType,
  userNote?: string
): ContextPayload {
  const branch = run("git branch --show-current");
  const recentCommits = run("git log -n 5 --oneline")
    .split("\n")
    .filter(Boolean);
  const stagedDiff = run("git diff --cached");
  const unstagedDiff = run("git diff");

  return {
    command,
    branch,
    recentCommits,
    stagedDiff,
    unstagedDiff,
    userNote: userNote || undefined,
  };
}
