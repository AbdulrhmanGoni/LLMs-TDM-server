import { Types } from "mongoose";
import createTransactionSession from "../../utilities/createTransactionSession";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { AddInstructionInput } from "../../types/instructions";
import type { ServiceOperationResultType } from "../../types/response";
import datasetsService from "../datasets";
import activitiesService from "../activities";

export default async function addInstruction_service(
  instructionInput: AddInstructionInput
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const { Model, failure } = await InstructionModel(instructionInput.datasetId);

  if (Model) {
    const newInstruction = new Model(instructionInput);
    const addInstructionResult = await newInstruction
      .save({ session })
      .then(() => true)
      .catch(() => false);

    if (addInstructionResult) {
      const incrementInstructionsCountResult =
        await datasetsService.incrementInstructionsCount(
          instructionInput.datasetId,
          1,
          session
        );

      if (incrementInstructionsCountResult.isSuccess) {
        await session.commitTransaction();
        activitiesService.registerInstructionActivity(
          new Types.ObjectId(instructionInput.datasetId),
          newInstruction._id,
          newInstruction.createdAt,
          "New Resource"
        );
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
  } else {
    return failure;
  }
}
