import type { Types } from "mongoose";

export type ActivityResource = "Instructions" | "Datasets";

export type ActivitiesTypes = "New Resource" | "Modification";

export type DatasetActivity = {
  datasetId: Types.ObjectId;
  activity: string;
  activityDate: Date;
};

export type InstructionActivity = DatasetActivity & {
  instructionId: Types.ObjectId;
};

export type Activity = DatasetActivity | InstructionActivity;

export type ActivityFilter = {
  instructionId?: Types.ObjectId;
  datasetId: Types.ObjectId;
};
