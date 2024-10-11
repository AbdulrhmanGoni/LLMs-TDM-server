import { Types } from "mongoose";
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

export class DatasetDocument implements DatasetInput {
  _id: Types.ObjectId;
  name: string;
  description: string;
  instructionsCount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: DatasetInput) {
    this._id = new Types.ObjectId();
    this.name = data.name;
    this.description = data.description;
    this.instructionsCount = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
