import { Command } from "commander";
import { loadConfig, ensureApiKey } from "../../core/config/index.js";
import { runCommand } from "../../app/workflows/index.js";

export const documentCommand = new Command("document")
  .description("Generate a session documentation log")
  .option("-n, --note <note>", "Add a note about what you worked on")
  .action(async (options) => {
    try {
      await ensureApiKey();
      const config = loadConfig();
      const filepath = await runCommand("document", config, options.note);
      console.log(`\u2713 Session log created`);
      console.log(filepath);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`\u2717 ${message}`);
      process.exit(1);
    }
  });
