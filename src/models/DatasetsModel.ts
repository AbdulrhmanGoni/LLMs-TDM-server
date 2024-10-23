import { Schema, model } from "mongoose";
import type { DatasetDocument } from "../types/datasets";

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
    huggingfaceAccount: {
      type: {
        accessToken: {
          type: String,
          required: true,
        },
        refreshToken: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        emailVerified: {
          type: Boolean,
          required: true,
        },
        _id: false,
      },
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const DatasetsModel = model("datasets", DatasetsSchema);

export default DatasetsModel;
