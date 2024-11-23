import UserModel from "../../models/UserModel";
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

  const userData = await UserModel.findById(
    userId,
    {},
    { upsert: true }
  );

  if (!userData) {
    await UserModel.create({
      _id: userId,
      datasets: [newDataset],
      datasetsActivities: [],
      instructionsActivities: [],
    });
    return successfulDatasetCreation(userId, newDataset);
  }

  if (userData.datasets.length < maxDatasetsForUser) {
    userData.datasets.push(newDataset);
    await userData.save();
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
