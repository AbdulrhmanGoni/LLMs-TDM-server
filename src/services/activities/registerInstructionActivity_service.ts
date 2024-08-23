import type { Types } from "mongoose";
import type { ActivitiesTypes } from "../../types/activities";
import registerActivity_service from "./registerActivity_service";

export default async function registerInstructionActivity_service(
  datasetId: Types.ObjectId,
  instructionId: Types.ObjectId,
  activityDate: Date,
  activity: ActivitiesTypes
) {
  try {
    await registerActivity_service("Instructions", {
      instructionId,
      datasetId,
      activityDate,
      activity,
    });
  } catch {
    // logging system
  }
}
