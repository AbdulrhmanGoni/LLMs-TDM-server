import { Schema, model } from "mongoose";

const DatasetSchema = new Schema(
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

const DatasetModel = model("datasets", DatasetSchema);

export default DatasetModel;
