import type { ClientSession } from "mongoose";
import DatasetsModel from "../../models/DatasetsModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import type { DatasetRepository } from "../../types/huggingface";

type SetDatasetRepositoryParams = {
  userId: string;
  datasetId: Dataset["id"];
  repository: Partial<DatasetRepository> | null;
  options?: { session?: ClientSession };
};

export default async function setDatasetRepository_service({
  userId,
  datasetId,
  repository,
  options,
}: SetDatasetRepositoryParams): Promise<ServiceOperationResultType> {
  let updateObject = {};
  if (repository === null) {
    updateObject = { $unset: { "datasets.$.repository": true } };
  } else {
    updateObject = {
      $set: Object.keys(repository).reduce((updateObject, key) => {
        Object.assign(updateObject, {
          [`datasets.$.repository.${key}`]:
            repository[key as keyof DatasetRepository],
        });
        return updateObject;
      }, {}),
    };
  }

  const { modifiedCount, matchedCount } = await DatasetsModel.updateOne(
    { _id: userId, "datasets._id": datasetId },
    updateObject,
    { session: options?.session }
  );

  if (modifiedCount) {
    return ServiceOperationResult.success(true);
  }

  if (matchedCount) {
    return ServiceOperationResult.failure(
      "No dataset found to update its repository"
    );
  }

  return ServiceOperationResult.failure(
    "Failed to update the repository of the dataset"
  );
}
