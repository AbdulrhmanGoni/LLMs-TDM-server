import createTransactionSession from "../../utilities/createTransactionSession";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import type { Instruction } from "../../types/instructions";
import type { ServiceOperationResultType } from "../../types/response";
import activitiesService from "../activities";
import datasetsService from "../datasets";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function deleteInstruction_service(
  userId: string,
  datasetId: Dataset["id"],
  instructionId: Instruction["id"]
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const instruction = await InstructionModel.findByIdAndDelete(instructionId, {
    session,
  });

  if (instruction) {
    const incrementInstructionsCountResult =
      await datasetsService.incrementInstructionsCount(
        userId,
        datasetId,
        -1,
        session
      );

    if (incrementInstructionsCountResult.isSuccess) {
      activitiesService.registerInstructionActivity(
        userId,
        datasetId,
        {
          _id: instruction._id,
          systemMessage: instruction.systemMessage,
          question: instruction.question,
          answer: instruction.answer,
        },
        new Date(),
        "Deletion"
      );
      await session.commitTransaction();
      return ServiceOperationResult.success(
        true,
        operationsResultsMessages.successfulInstructionDeletion
      );
    } else {
      await session.abortTransaction();
      return ServiceOperationResult.failure(
        operationsResultsMessages.failedInstructionDeletion
      );
    }
  } else {
    await session.abortTransaction();
    return ServiceOperationResult.failure(
      operationsResultsMessages.noInstructionToDelete
    );
  }
}
