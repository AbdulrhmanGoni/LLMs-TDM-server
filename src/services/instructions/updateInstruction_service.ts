import { Types } from "mongoose";
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
  datasetId: Dataset["id"],
  instructionId: Instruction["id"],
  updateData: UpdateInstructionInput
): Promise<ServiceOperationResultType<Instruction>> {
  const { Model, failure } = await InstructionModel(datasetId);

  if (Model) {
    const updatedInstruction = await Model.findOneAndUpdate(
      { _id: instructionId },
      updateData,
      { new: true }
    );

    if (updatedInstruction) {
      activitiesService.registerInstructionActivity(
        new Types.ObjectId(datasetId),
        updatedInstruction._id,
        updatedInstruction.updatedAt,
        "Modification"
      );
      return ServiceOperationResult.success(
        updatedInstruction,
        "The instruction updated successfully"
      );
    }

    return ServiceOperationResult.failure("Failed to update the instruction");
  } else {
    return failure;
  }
}
