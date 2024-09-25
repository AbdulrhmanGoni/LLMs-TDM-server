import type { Types } from "mongoose";
import type { Dataset } from "./datasets";
import type { InstructionBase } from "./instructions";

export type ActivityResource = "Instructions" | "Datasets";

export type ActivitiesTypes = "New Resource" | "Modification" | "Deletion";

export type DatasetActivity = {
  datasetId: Types.ObjectId;
  activity: ActivityResource;
  activityDate: Date;
  deletedResource?: Pick<Dataset, "name" | "description"> | InstructionBase;
};

export type InstructionActivity = DatasetActivity & {
  instructionId: Types.ObjectId;
};

export type Activity = DatasetActivity | InstructionActivity;

export type ActivityFilter = {
  instructionId?: Types.ObjectId;
  datasetId: Types.ObjectId;
};
