import mongoose from "mongoose";
import DatasetModel from "../../models/DatasetModel";
import type { Dataset } from "../../types/datasets";
import createTransactionSession from "../../utilities/createTransactionSession";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import activitiesService from "../activities";

export default async function deleteDataset_service(
  datasetId: Dataset["id"]
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();
  const dataset = await DatasetModel.findOneAndDelete(
    { _id: datasetId },
    { session, projection: ["name"] }
  );

  if (dataset) {
    const collectionDroped = await mongoose.connection
      .dropCollection(datasetId)
      .then(() => true)
      .catch(() => false);

    if (collectionDroped) {
      await session.commitTransaction();
      activitiesService.unregisterDatasetActivity(dataset.id);
      return ServiceOperationResult.success(
        true,
        `"${dataset?.name}" dataset was deleted successfully`
      );
    } else {
      session.abortTransaction();
      return ServiceOperationResult.failure(
        `Deleting "${dataset?.name}" dataset failed`
      );
    }
  } else {
    await session.abortTransaction();
    return ServiceOperationResult.failure(
      `There is no dataset with "${datasetId}" id`
    );
  }
}
