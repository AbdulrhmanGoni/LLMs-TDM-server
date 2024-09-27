import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import type {
  Instruction,
  UpdateInstructionInput,
} from "../../types/instructions";
import activitiesService from "../activities";
import type { ServiceOperationResultType } from "../../types/response";

export default async function updateInstruction_service(
  userId: string,
  datasetId: Dataset["id"],
  instructionId: Instruction["id"],
  updateData: UpdateInstructionInput
): Promise<ServiceOperationResultType<Instruction>> {
  const updatedInstruction = await InstructionModel.findOneAndUpdate(
    { _id: instructionId },
    updateData,
    { new: true }
  );

  if (updatedInstruction) {
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

    return ServiceOperationResult.success(
      updatedInstruction,
      "The instruction updated successfully"
    );
  }

  return ServiceOperationResult.failure("Failed to update the instruction");
}
