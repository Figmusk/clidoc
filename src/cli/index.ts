#!/usr/bin/env node

import { Command } from "commander";
import { loadConfig, ensureApiKey } from "../core/config/index.js";
import { runCommand } from "../app/workflows/index.js";
import { documentCommand } from "./commands/document.js";
import { decisionCommand } from "./commands/decision.js";
import { updateCommand } from "./commands/update.js";
import { reviewCommand } from "./commands/review.js";
import { timelineCommand } from "./commands/timeline.js";

const program = new Command();

program
  .name("clidoc")
  .description("The designer's git commit — capture thinking, not just code")
  .version("0.1.0");

// Default action: run document command when no subcommand given
program
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

program.addCommand(documentCommand);
program.addCommand(decisionCommand);
program.addCommand(updateCommand);
program.addCommand(reviewCommand);
program.addCommand(timelineCommand);

program.parse();
