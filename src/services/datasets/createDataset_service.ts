import mongoose from "mongoose";
import createTransactionSession from "../../utilities/createTransactionSession";
import DatasetModel from "../../models/DatasetModel";
import type { DatasetInput } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import activitiesService from "../activities";

export default async function createDataset_service(
  dataset: DatasetInput
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const newDataset = new DatasetModel(dataset);
  const datasetAdded = await newDataset
    .save({ session })
    .then(() => true)
    .catch(() => false);

  if (datasetAdded) {
    const collectionCreated = await mongoose.connection
      .createCollection(newDataset.id, { session })
      .then(() => true)
      .catch(() => false);

    if (collectionCreated) {
      await session.commitTransaction();
      activitiesService.registerDatasetActivity(
        newDataset._id,
        newDataset.createdAt,
        "New Resource"
      );
      return ServiceOperationResult.success(
        newDataset,
        `"${dataset.name}" dataset created successfuly`
      );
    }
  }

  await session.abortTransaction();
  return ServiceOperationResult.failure(
    `"${newDataset.name}" dataset creation failed`
  );
}
