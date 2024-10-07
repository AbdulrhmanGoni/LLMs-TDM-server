import createTransactionSession from "../../utilities/createTransactionSession";
import DatasetsModel, { DatasetDocument } from "../../models/DatasetsModel";
import type { DatasetInput } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import activitiesService from "../activities";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function createDataset_service(
  userId: string,
  dataset: DatasetInput
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const newDataset = new DatasetDocument(dataset);

  const datasetAdded = await DatasetsModel.updateOne(
    { _id: userId },
    { $push: { datasets: newDataset } },
    { upsert: true, session }
  )
    .then(() => true)
    .catch(() => false);

  if (datasetAdded) {
    await session.commitTransaction();
    activitiesService.registerDatasetActivity(
      userId,
      {
        _id: newDataset._id,
        name: newDataset.name,
        description: newDataset.description,
      },
      newDataset.createdAt,
      "New Resource"
    );

    return ServiceOperationResult.success(
      newDataset,
      operationsResultsMessages.successfulDatasetCreation(newDataset.name)
    );
  }

  await session.abortTransaction();
  return ServiceOperationResult.failure(
    operationsResultsMessages.failedDatasetCreation(newDataset.name)
  );
}
