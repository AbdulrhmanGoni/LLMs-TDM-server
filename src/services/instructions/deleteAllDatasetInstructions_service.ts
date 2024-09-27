import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import type { ClientSession } from "mongoose";

export default async function deleteAllDatasetInstructions_service(
  datasetId: Dataset["id"],
  options?: { session?: ClientSession }
): Promise<ServiceOperationResultType> {
  const { acknowledged, deletedCount } = await InstructionModel.deleteMany(
    { datasetId },
    { session: options?.session }
  );

  if (deletedCount) {
    return ServiceOperationResult.success(
      true,
      `The instructions of the dataset was deleted successfully`
    );
  }

  if (acknowledged) {
    return ServiceOperationResult.success(
      true,
      `There is no instructions to delete from this dataset`
    );
  } else {
    return ServiceOperationResult.failure(
      `Deleting the instructions of this dataset failed`
    );
  }
}
