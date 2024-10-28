import { Types, type ClientSession } from "mongoose";
import DatasetsModel from "../../models/DatasetsModel";
import type { Dataset, DatasetDocument } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import type { DatasetRepository } from "../../types/huggingface";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

type SetDatasetRepositoryParams = {
  userId: string;
  datasetId: Dataset["id"];
  repository: Partial<DatasetRepository> | null;
  options?: {
    session?: ClientSession;
    returnUpdatedDocument?: boolean;
  };
};

export default async function setDatasetRepository_service({
  userId,
  datasetId,
  repository,
  options,
}: SetDatasetRepositoryParams): Promise<
  ServiceOperationResultType<DatasetDocument>
> {
  let updateObject = {};
  if (repository === null) {
    updateObject = { $unset: { "datasets.$[dst].repository": true } };
  } else {
    updateObject = {
      $set: Object.keys(repository).reduce((updateObject, key) => {
        Object.assign(updateObject, {
          [`datasets.$[dst].repository.${key}`]:
            repository[key as keyof DatasetRepository],
        });
        return updateObject;
      }, {}),
    };
  }

  const data = await DatasetsModel.findByIdAndUpdate(
    { _id: userId },
    updateObject,
    {
      session: options?.session,
      new: options?.returnUpdatedDocument,
      arrayFilters: [{ "dst._id": { $eq: new Types.ObjectId(datasetId) } }],
    }
  );

  const dataset = data?.datasets.find((dataset) => dataset.id === datasetId);

  if (dataset) {
    return ServiceOperationResult.success(dataset);
  }

  return ServiceOperationResult.failure(
    operationsResultsMessages.noDataset(datasetId)
  );
}
