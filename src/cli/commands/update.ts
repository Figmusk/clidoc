import { Command } from "commander";
import { loadConfig, ensureApiKey } from "../../core/config/index.js";
import { runCommand } from "../../app/workflows/index.js";

export const updateCommand = new Command("update")
  .description("Create a quick progress update")
  .option("-n, --note <note>", "Add a progress note")
  .action(async (options) => {
    try {
      await ensureApiKey();
      const config = loadConfig();
      const filepath = await runCommand("update", config, options.note);
      console.log(`\u2713 Update saved`);
      console.log(filepath);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`\u2717 ${message}`);
      process.exit(1);
    }
  });
