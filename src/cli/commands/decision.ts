import { Command } from "commander";
import { loadConfig } from "../../core/config/index.js";
import { runCommand } from "../../app/workflows/index.js";

export const decisionCommand = new Command("decision")
  .description("Record a design or product decision")
  .option("-n, --note <note>", "Describe the decision")
  .action(async (options) => {
    try {
      const config = loadConfig();
      const filepath = await runCommand("decision", config, options.note);
      console.log(`\u2713 Decision recorded`);
      console.log(filepath);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`\u2717 ${message}`);
      process.exit(1);
    }
  });
