import type { ActivitiesTypes, DatasetActivity } from "../../types/activities";
import registerActivity_service from "./registerActivity_service";

export default async function registerDatasetActivity_service(
  userId: string,
  dataset: DatasetActivity["dataset"],
  activityDate: Date,
  activity: ActivitiesTypes
) {
  try {
    await registerActivity_service(
      "Datasets",
      {
        dataset,
        activityDate,
        activity,
      },
      userId
    );
  } catch {
    // logging system
  }
}
