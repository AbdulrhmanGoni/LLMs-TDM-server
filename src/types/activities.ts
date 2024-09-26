import type { Types } from "mongoose";
import type { DatasetBase } from "./datasets";
import type { InstructionBase } from "./instructions";

export type ActivityResource = "Instructions" | "Datasets";

export type ActivitiesTypes = "New Resource" | "Modification" | "Deletion";

export type DatasetActivity = {
  dataset: DatasetBase & { _id: Types.ObjectId };
  activity: ActivitiesTypes;
  activityDate: Date;
};

export type InstructionActivity = DatasetActivity & {
  instruction: InstructionBase & { _id: Types.ObjectId };
};

export type Activity = DatasetActivity | InstructionActivity;
