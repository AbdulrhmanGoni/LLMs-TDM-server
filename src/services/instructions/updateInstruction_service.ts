import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import type {
  Instruction,
  UpdateInstructionInput,
} from "../../types/instructions";
import activitiesService from "../activities";
import type { ServiceOperationResultType } from "../../types/response";
import operationsResultsMessages from "../../constants/operationsResultsMessages";
import datasetsService from "../datasets";
import createTransactionSession from "../../utilities/createTransactionSession";

export default async function updateInstruction_service(
  userId: string,
  datasetId: Dataset["id"],
  instructionId: Instruction["id"],
  updateData: UpdateInstructionInput
): Promise<ServiceOperationResultType<Instruction>> {
  const session = await createTransactionSession();

  const updatedInstruction = await InstructionModel.findOneAndUpdate(
    { _id: instructionId },
    updateData,
    { new: true, session }
  );

  if (updatedInstruction) {
    const updatingRepoOperation = await datasetsService.setDatasetRepository({
      datasetId,
      userId,
      repository: { isUpToDate: false },
      options: { session },
    });

    if (!updatingRepoOperation.isSuccess) {
      session.abortTransaction();
      return ServiceOperationResult.failure(updatingRepoOperation.message);
    }

    activitiesService.registerInstructionActivity(
      userId,
      datasetId,
      {
        _id: updatedInstruction._id,
        systemMessage: updatedInstruction.systemMessage,
        question: updatedInstruction.question,
        answer: updatedInstruction.answer,
      },
      updatedInstruction.updatedAt,
      "Modification"
    );

    await session.commitTransaction();
    return ServiceOperationResult.success(
      updatedInstruction,
      operationsResultsMessages.successfulInstructionUpdate
    );
  }

  await session.abortTransaction();
  return ServiceOperationResult.failure(
    operationsResultsMessages.failedInstructionUpdate
  );
}
