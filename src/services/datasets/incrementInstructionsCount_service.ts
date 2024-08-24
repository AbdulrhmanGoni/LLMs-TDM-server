import type { ClientSession } from "mongoose";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetModel from "../../models/DatasetModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";

export default async function incrementInstructionsCount_service(
  id: Dataset["id"],
  incrementValue: number = 1,
  session?: ClientSession
): Promise<ServiceOperationResultType> {
  const result = await DatasetModel.updateOne(
    { _id: id },
    { $inc: { instructionsCount: incrementValue } },
    { session }
  );
  if (result.acknowledged && result.modifiedCount) {
    return ServiceOperationResult.success(
      true,
      "Instructions count incremented successfully"
    );
  } else if (!result.matchedCount) {
    return ServiceOperationResult.failure(
      `There is no dataset with "${id}" id`
    );
  } else {
    return ServiceOperationResult.failure(
      "Faild to increment instructions count"
    );
  }
}
