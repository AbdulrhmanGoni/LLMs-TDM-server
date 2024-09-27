import createTransactionSession from "../../utilities/createTransactionSession";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { AddInstructionInput } from "../../types/instructions";
import type { ServiceOperationResultType } from "../../types/response";
import datasetsService from "../datasets";
import activitiesService from "../activities";

export default async function addInstruction_service(
  userId: string,
  instructionInput: AddInstructionInput
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const newInstruction = new InstructionModel(instructionInput);
  const addInstructionResult = await newInstruction
    .save({ session })
    .then(() => true)
    .catch(() => false);

  if (addInstructionResult) {
    const incrementInstructionsCountResult =
      await datasetsService.incrementInstructionsCount(
        userId,
        instructionInput.datasetId,
        1,
        session
      );

    if (incrementInstructionsCountResult.isSuccess) {
      activitiesService.registerInstructionActivity(
        userId,
        instructionInput.datasetId,
        {
          _id: newInstruction._id,
          systemMessage: newInstruction.systemMessage,
          question: newInstruction.question,
          answer: newInstruction.answer,
        },
        newInstruction.createdAt,
        "New Resource"
      );

      await session.commitTransaction();
      return ServiceOperationResult.success(
        newInstruction,
        `The instruction added to the dataset successfully`
      );
    }
  }

  await session.abortTransaction();
  return ServiceOperationResult.failure(
    `Adding the instruction to the dataset failed`
  );
}
