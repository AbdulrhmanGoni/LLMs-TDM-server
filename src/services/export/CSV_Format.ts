import type { DatasetFormat } from "../../types/datasets";
import type { InstructionBase } from "../../types/instructions";
import sanitizer from "../../utilities/instructionTextSanitizer";

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
