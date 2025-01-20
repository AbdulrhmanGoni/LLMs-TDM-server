import type { DatasetFormat } from "../../types/datasets";
import type { InstructionBase } from "../../types/instructions";
import sanitizer from "../../utilities/instructionTextSanitizer";

function JSONL_Formater({
  systemMessage,
  question,
  answer,
}: InstructionBase): string {
  return (
    `{${systemMessage ? `"systemMessage": "${sanitizer(systemMessage)}",` : ""}` +
    `"prompt": "${sanitizer(question)}",` +
    `"response": "${sanitizer(answer)}"}\n`
  );
}

const QAFormat: DatasetFormat = {
  formater: JSONL_Formater,
};

export default QAFormat;
