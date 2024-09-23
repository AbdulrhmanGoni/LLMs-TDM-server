import type { DatasetFormat } from "../../types/datasets";
import type { InstructionBase } from "../../types/instructions";

function CSV_Formater({
  systemMessage,
  question,
  answer,
}: InstructionBase): string {
  return (
    `"\n${systemMessage ? systemMessage + "\n\n" : ""}` +
    `### Prompt: ${question}\n\n` +
    `### Response: ${answer}\n"\n`
  );
}

const QAFormat: DatasetFormat = {
  formater: CSV_Formater,
  decorators: {
    first: "text\n",
  },
};

export default QAFormat;
