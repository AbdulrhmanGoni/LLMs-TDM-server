import type { DatasetFormat } from "../../types/datasets";
import type { InstructionBase } from "../../types/instructions";

function JSONL_Formater({
  systemMessage,
  question,
  answer,
}: InstructionBase): string {
  return (
    `{${systemMessage ? `"System": "${systemMessage}",` : ""}` +
    `"Prompt": "${question}",` +
    `"Response": "${answer}"}\n`
  );
}

const QAFormat: DatasetFormat = {
  formater: JSONL_Formater,
};

export default QAFormat;
