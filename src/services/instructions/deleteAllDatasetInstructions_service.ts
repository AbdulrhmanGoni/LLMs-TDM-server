import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import type { ClientSession } from "mongoose";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

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
      operationsResultsMessages.successfulAllInstructionsDeletion
    );
  }

  if (acknowledged) {
    return ServiceOperationResult.success(
      true,
      operationsResultsMessages.noInstructionsToDelete
    );
  } else {
    return ServiceOperationResult.failure(
      operationsResultsMessages.failedDeletingAllInstructions
    );
  }
}
