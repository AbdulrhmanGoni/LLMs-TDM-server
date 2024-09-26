import { Schema, model } from "mongoose";

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
          instruction: {
            type: Schema.Types.Mixed,
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
