import { Types } from "mongoose";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import type {
  Instruction,
  UpdateInstructionInput,
} from "../../types/instructions";
import activitiesService from "../activities";

export default async function updateInstruction_service(
  datasetId: Dataset["id"],
  instructionId: Instruction["id"],
  updateData: UpdateInstructionInput
) {
  const { Model, failure } = await InstructionModel(datasetId);

  if (Model) {
    const theInstruction = await Model.findOneAndUpdate(
      { _id: instructionId },
      updateData
    );

    if (theInstruction) {
      activitiesService.registerInstructionActivity(
        new Types.ObjectId(datasetId),
        theInstruction._id,
        theInstruction.updatedAt,
        "Modification"
      );
      return ServiceOperationResult.success(
        true,
        "The instruction updated successfully"
      );
    }

    return ServiceOperationResult.failure("Failed to update the instruction");
  } else {
    return failure;
  }
}
