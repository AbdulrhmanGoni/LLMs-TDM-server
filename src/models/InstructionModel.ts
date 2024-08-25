import mongoose, { Schema, Types, model } from "mongoose";
import type { Dataset } from "../types/datasets";
import ServiceOperationResult from "../utilities/ServiceOperationResult";

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

export default async function InstructionModel(datasetId: Dataset["id"]) {
  const collectionExists = (await mongoose.connection.listCollections()).some(
    (collection) => collection.name === datasetId
  );

  if (collectionExists) {
    return { Model: model(datasetId, InstructionSchema, datasetId) };
  }

  return {
    failure: ServiceOperationResult.failure(
      "There is no dataset with this id: " + datasetId
    ),
  };
}
