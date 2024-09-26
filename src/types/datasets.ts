import type { InstructionBase } from "./instructions";

export type DatasetBase = {
  name: string;
  description: string;
};

export type DatasetInput = DatasetBase;
export type UpdateDatasetInput = DatasetBase;

export type Dataset = DatasetBase & {
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
