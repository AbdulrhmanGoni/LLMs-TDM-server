import type { Dataset } from "./datasets";

export type InstructionBase = {
  systemMessage?: string | null;
  question: string;
  answer: string;
};

export type AddInstructionInput = InstructionBase & {
  datasetId: Dataset["id"];
};

export type Instruction = InstructionBase & {
  id: string;
  datasetId: Dataset["id"];
};

export type UpdateInstructionInput = InstructionBase;
