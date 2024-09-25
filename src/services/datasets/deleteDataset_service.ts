import DatasetsModel from "../../models/DatasetsModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import activitiesService from "../activities";

export default async function deleteDataset_service(
  userId: string,
  datasetId: Dataset["id"]
): Promise<ServiceOperationResultType> {
  const result = await DatasetsModel.updateOne(
    { _id: userId },
    { $pull: { datasets: { _id: datasetId } } }
  );

  if (result.modifiedCount) {
    activitiesService.unregisterDatasetActivity(userId, datasetId);
    return ServiceOperationResult.success(
      true,
      `The dataset was deleted successfully`
    );
  } else if (result.matchedCount) {
    return ServiceOperationResult.failure(
      `There is no dataset with "${datasetId}" id`
    );
  } else {
    return ServiceOperationResult.failure(
      `There is no user with "${userId}" id`
    );
  }
}
