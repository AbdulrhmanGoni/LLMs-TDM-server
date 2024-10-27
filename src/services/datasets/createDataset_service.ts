import createTransactionSession from "../../utilities/createTransactionSession";
import DatasetsModel from "../../models/DatasetsModel";
import { DatasetDocument, type DatasetInput } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import activitiesService from "../activities";
import operationsResultsMessages from "../../constants/operationsResultsMessages";
import maxDatasetsForUser from "../../constants/maxDatasetsForUser";

export default async function createDataset_service(
  userId: string,
  dataset: DatasetInput
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const newDataset = new DatasetDocument(dataset);

  const userDatasets = await DatasetsModel.findById(
    userId,
    {},
    { upsert: true }
  );

  if (userDatasets && userDatasets.datasets.length < maxDatasetsForUser) {
    userDatasets.datasets.push(newDataset);
    const datasetAdded = await userDatasets
      .save({ session })
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

    session.abortTransaction();
    return ServiceOperationResult.failure(
      operationsResultsMessages.failedDatasetCreation(newDataset.name)
    );
  } else {
    session.abortTransaction();
    return ServiceOperationResult.failure(
      operationsResultsMessages.maxDatasetsReached
    );
  }
}
