import { Types } from "mongoose";
import type { ActivitiesTypes } from "../../types/activities";
import registerActivity_service from "./registerActivity_service";

export default async function registerDatasetActivity_service(
  userId: string,
  datasetId: Types.ObjectId | string,
  activityDate: Date,
  activity: ActivitiesTypes
) {
  try {
    await registerActivity_service(
      "Datasets",
      {
        datasetId:
          typeof datasetId === "string"
            ? new Types.ObjectId(datasetId)
            : datasetId,
        activityDate,
        activity,
      },
      userId
    );
  } catch {
    // logging system
  }
}
