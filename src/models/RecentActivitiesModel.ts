import { Schema, Types, model } from "mongoose";

const ActivitySchema = {
  datasetId: {
    type: Types.ObjectId,
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
  deletedResource: {
    type: Schema.Types.Mixed,
    required: true,
  },
};

const RecentActivitiesSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    recentActivitiesOfInstructions: {
      type: [
        {
          ...ActivitySchema,
          instructionId: {
            type: Types.ObjectId,
            required: true,
          },
        },
      ],
      default: [],
      required: true,
    },
    recentActivitiesOfDatasets: {
      type: [ActivitySchema],
      default: [],
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const RecentActivitiesModel = model(
  "recent-activities",
  RecentActivitiesSchema
);

export default RecentActivitiesModel;
