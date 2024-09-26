import type { ClientSession } from "mongoose";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetModel from "../../models/DatasetsModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";

export default async function incrementInstructionsCount_service(
  userId: string,
  datasetId: Dataset["id"],
  incrementValue: number = 1,
  session?: ClientSession
): Promise<ServiceOperationResultType> {
  const result = await DatasetModel.updateOne(
    { _id: userId },
    {
      $inc: {
        "datasets.$[dataset].instructionsCount": incrementValue,
      },
    },
    {
      session,
      arrayFilters: [{ "dataset._id": datasetId }],
    }
  );

  if (result.modifiedCount) {
    return ServiceOperationResult.success(
      true,
      "Instructions count incremented successfully"
    );
  } else if (!result.matchedCount) {
    return ServiceOperationResult.failure(
      `There is no dataset with "${datasetId}" id`
    );
  } else {
    return ServiceOperationResult.failure(
      "Faild to increment instructions count"
    );
  }
}
