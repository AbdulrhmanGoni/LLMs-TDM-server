import stringValidator from "./stringValidator";

export default function InstructionSchemaRules() {
  return {
    systemMessage: stringValidator().min(3).max(5000),
    question: stringValidator().min(3).max(5000),
    answer: stringValidator().min(3).max(5000),
  };
}
