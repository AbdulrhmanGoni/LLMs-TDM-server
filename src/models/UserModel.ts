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
    repository: {
      type: {
        name: {
          type: String,
          required: true,
        },
        filePath: {
          type: String,
          required: true,
        },
        fileFormat: {
          type: String,
          required: true,
        },
        syncedAt: {
          type: Date,
          required: true,
        },
        isUpToDate: {
          type: Boolean,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ActivitySchema = {
  dataset: {
    type: Schema.Types.Mixed,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  activityDate: {
    type: Date,
    required: true,
  },
};

const UserSchema = new Schema(
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
        accessTokenExpiresIn: {
          type: Date,
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
    datasetsActivities: {
      type: [ActivitySchema],
      default: [],
      required: true,
    },
    instructionsActivities: {
      type: [
        {
          ...ActivitySchema,
          instruction: {
            type: Schema.Types.Mixed,
            required: true,
          },
        },
      ],
      default: [],
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const UserModel = model("user", UserSchema);

export default UserModel;
