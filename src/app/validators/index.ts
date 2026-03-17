import type { StructuredDoc } from "../../core/types/index.js";

export function validateDoc(doc: StructuredDoc): StructuredDoc {
  if (!doc.title) {
    doc.title = "Untitled Session";
  }
  if (!doc.summary) {
    doc.summary = "No summary generated.";
  }
  if (!doc.changes || doc.changes.length === 0) {
    doc.changes = ["No changes recorded."];
  }
  return doc;
}
