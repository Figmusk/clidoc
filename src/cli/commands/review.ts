import { Command } from "commander";
import { loadConfig } from "../../core/config/index.js";
import { runCommand } from "../../app/workflows/index.js";

export const reviewCommand = new Command("review")
  .description("Summarize current project state")
  .option("-n, --note <note>", "Scope the review")
  .action(async (options) => {
    try {
      const config = loadConfig();
      const filepath = await runCommand("review", config, options.note);
      console.log(`\u2713 Review summary created`);
      console.log(filepath);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`\u2717 ${message}`);
      process.exit(1);
    }
  });
