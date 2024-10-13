import type { ActivitiesTypes, DatasetActivity } from "../../types/activities";
import loggerService from "../logger";
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
    loggerService.error(`Failed to register '${activity}' dataset activity`, {
      service: "registerDatasetActivity_service",
      userId,
      datasetId: dataset._id.toString(),
    });
  }
}
