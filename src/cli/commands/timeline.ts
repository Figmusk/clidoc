import { Command } from "commander";
import { loadConfig } from "../../core/config/index.js";
import { readTimeline } from "../../core/files/index.js";

export const timelineCommand = new Command("timeline")
  .description("View a timeline of all documented sessions")
  .action(async () => {
    try {
      const config = loadConfig();
      const entries = await readTimeline(config.outputDir);

      if (entries.length === 0) {
        console.log("No sessions documented yet. Run `clidoc` to create one.");
        return;
      }

      console.log("\n  Clidoc Timeline\n");
      for (const entry of entries) {
        console.log(entry);
      }
      console.log();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`\u2717 ${message}`);
      process.exit(1);
    }
  });
