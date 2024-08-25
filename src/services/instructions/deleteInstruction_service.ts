import createTransactionSession from "../../utilities/createTransactionSession";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import type { Instruction } from "../../types/instructions";
import type { ServiceOperationResultType } from "../../types/response";
import activitiesService from "../activities";
import datasetsService from "../datasets";

export default async function deleteInstruction_service(
  datasetId: Dataset["id"],
  instructionId: Instruction["id"]
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const { Model, failure } = await InstructionModel(datasetId);

  if (Model) {
    const deletionResults = await Model.deleteOne(
      { _id: instructionId },
      { session }
    );

    if (deletionResults.deletedCount) {
      const incrementInstructionsCountResult =
        await datasetsService.incrementInstructionsCount(
          datasetId,
          -1,
          session
        );

      if (incrementInstructionsCountResult.isSuccess) {
        await session.commitTransaction();
        activitiesService.unregisterInstructionActivity(
          datasetId,
          instructionId
        );
        return ServiceOperationResult.success(
          true,
          `The instruction deleted from the dataset successfully`
        );
      }
    }

    if (deletionResults.acknowledged) {
      await session.abortTransaction();
      return ServiceOperationResult.failure(
        `The targeted instruction not found to delete it from the dataset`
      );
    }

    await session.abortTransaction();
    return ServiceOperationResult.failure(
      `Deleting the instruction from the dataset failed`
    );
  } else {
    return failure;
  }
}
