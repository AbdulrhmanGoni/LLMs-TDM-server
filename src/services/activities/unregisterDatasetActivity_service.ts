import { Types } from "mongoose";
import type { Dataset } from "../../types/datasets";
import unregisterActivities_service from "./unregisterActivity_service";

export default async function unregisterDatasetActivity_service(
  datasetId: Dataset["id"]
) {
  try {
    await unregisterActivities_service("Datasets", {
      datasetId: new Types.ObjectId(datasetId),
    });
  } catch {
    // logging system
  }
}
