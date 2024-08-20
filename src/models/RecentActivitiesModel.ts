import { Schema, Types, model } from "mongoose";

const SharedSchema = {
  datasetsId: {
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
          ...SharedSchema,
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
      type: [SharedSchema],
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RecentActivitiesModel = model(
  "recent-activities",
  RecentActivitiesSchema
);

export default RecentActivitiesModel;
