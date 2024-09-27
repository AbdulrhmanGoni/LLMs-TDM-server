import { Schema, Types, model } from "mongoose";

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

const InstructionModel = model("instructions", InstructionSchema);

export default InstructionModel;
