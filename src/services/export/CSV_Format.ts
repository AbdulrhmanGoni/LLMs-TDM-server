import type { DatasetFormat } from "../../types/datasets";
import type { InstructionBase } from "../../types/instructions";

function sanitizer(text?: string | null) {
  return text?.replaceAll(/("|\n)/g, (s) =>
    s === '"' ? "'" : s === "\n" ? " " : s
  );
}

function CSV_Formater({
  systemMessage,
  question,
  answer,
}: InstructionBase): string {
  return (
    `"${systemMessage ? sanitizer(systemMessage) + ". " : ""}` +
    `### Prompt: ${sanitizer(question)}. ` +
    `### Response: ${sanitizer(answer)}." \n`
  );
}

const QAFormat: DatasetFormat = {
  formater: CSV_Formater,
  decorators: {
    first: "text\n",
  },
};

export default QAFormat;
