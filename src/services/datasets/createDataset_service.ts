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
  const newDataset = new DatasetDocument(dataset);

  const userDatasets = await DatasetsModel.findById(
    userId,
    {},
    { upsert: true }
  );

  if (!userDatasets) {
    await DatasetsModel.create({
      _id: userId,
      datasets: [newDataset],
    });
    return successfulDatasetCreation(userId, newDataset);
  }

  if (userDatasets.datasets.length < maxDatasetsForUser) {
    userDatasets.datasets.push(newDataset);
    await userDatasets.save();
    return successfulDatasetCreation(userId, newDataset);
  } else {
    return ServiceOperationResult.failure(
      operationsResultsMessages.maxDatasetsReached
    );
  }
}

function successfulDatasetCreation(
  userId: string,
  newDataset: DatasetDocument
) {
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
