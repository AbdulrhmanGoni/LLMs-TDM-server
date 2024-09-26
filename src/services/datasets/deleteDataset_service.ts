import DatasetsModel from "../../models/DatasetsModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import activitiesService from "../activities";

export default async function deleteDataset_service(
  userId: string,
  datasetId: Dataset["id"]
): Promise<ServiceOperationResultType> {
  const result = await DatasetsModel.findByIdAndUpdate(
    { _id: userId },
    { $pull: { datasets: { _id: datasetId } } },
    { projection: { datasets: 1 } }
  );

  if (result) {
    const deletedDataset = result.datasets.find(
      (dataset) => dataset.id === datasetId
    );

    if (deletedDataset) {
      activitiesService.registerDatasetActivity(
        userId,
        {
          name: deletedDataset.name,
          description: deletedDataset.description,
          _id: deletedDataset._id,
        },
        new Date(),
        "Deletion"
      );
      return ServiceOperationResult.success(
        true,
        `The dataset was deleted successfully`
      );
    } else {
      return ServiceOperationResult.failure(
        `There is no dataset with "${datasetId}" id`
      );
    }
  } else {
    return ServiceOperationResult.failure(
      `There is no user with "${userId}" id`
    );
  }
}
