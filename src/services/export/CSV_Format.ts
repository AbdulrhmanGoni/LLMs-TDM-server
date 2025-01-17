import type { DatasetFormat } from "../../types/datasets";
import type { InstructionBase } from "../../types/instructions";
import sanitizer from "../../utilities/instructionTextSanitizer";

function CSV_Formater({
  systemMessage,
  question,
  answer,
}: InstructionBase): string {
  return (
    `"${systemMessage ? sanitizer(systemMessage) : ""}",` +
    `"${sanitizer(question)}","${sanitizer(answer)}"\n`
  );
}

const QAFormat: DatasetFormat = {
  formater: CSV_Formater,
  decorators: {
    first: "system,prompt,response\n",
  },
};

export default QAFormat;
