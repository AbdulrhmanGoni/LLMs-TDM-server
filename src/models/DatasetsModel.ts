import { Schema, Types, model } from "mongoose";
import type { DatasetInput } from "../types/datasets";

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

const DatasetSchema = new Schema<DatasetDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructionsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const DatasetsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    datasets: {
      type: [DatasetSchema],
      default: [],
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const DatasetsModel = model("datasets", DatasetsSchema);

export default DatasetsModel;
