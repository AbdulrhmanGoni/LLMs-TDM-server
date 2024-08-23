import type { Types } from "mongoose";
import type { ActivitiesTypes } from "../../types/activities";
import registerActivity_service from "./registerActivity_service";

export default async function registerDatasetActivity_service(
  datasetId: Types.ObjectId,
  activityDate: Date,
  activity: ActivitiesTypes
) {
  try {
    await registerActivity_service("Datasets", {
      datasetId,
      activityDate,
      activity,
    });
  } catch {
    // logging system
  }
}
