import { Schema, Types, model } from "mongoose";
import type { Dataset } from "../types/datasets";

const InstructionSchema = new Schema(
  {
    systemMessage: {
      type: String,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    datasetId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default function InstructionModel(datasetId: Dataset["id"]) {
  return model(datasetId, InstructionSchema, datasetId);
}
