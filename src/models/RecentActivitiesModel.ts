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
};

const RecentActivitiesSchema = new Schema(
  {
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
