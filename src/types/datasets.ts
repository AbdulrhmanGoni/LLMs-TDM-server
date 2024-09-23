import type { InstructionBase } from "./instructions";

export type DatasetInput = {
  name: string;
  description: string;
};

export type UpdateDatasetInput = DatasetInput;
export type Dataset = DatasetInput & {
  id: string;
  instructionsCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DatasetsFormatsTypes = "JSONL" | "CSV";

export type DatasetFormat = {
  formater: (instruction: InstructionBase) => string;
  decorators?: {
    first?: string;
    last?: string;
  };
};

export type DatasetsFormatsRegistry = Record<
  DatasetsFormatsTypes,
  DatasetFormat
>;
