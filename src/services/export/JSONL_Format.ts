import type { DatasetFormat } from "../../types/datasets";
import type { InstructionBase } from "../../types/instructions";

function JSONL_Formater({
  systemMessage,
  question,
  answer,
}: InstructionBase): string {
  return (
    `{\n${systemMessage ? `"System": "${systemMessage}",\n` : ""}` +
    `"Prompt": "${question}",\n` +
    `"Response": "${answer}"\n}\n`
  );
}

const QAFormat: DatasetFormat = {
  formater: JSONL_Formater,
};

export default QAFormat;
