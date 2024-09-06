import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import type { Instruction } from "../../types/instructions";
import type { ServiceOperationResultType } from "../../types/response";
import type { Types } from "mongoose";

export default async function getInstructionsByIds_service(
  datasetId: Dataset["id"],
  ids: Instruction["id"][] | Types.ObjectId[],
  options?: { projection?: string[] | Record<string, boolean | number> }
): Promise<ServiceOperationResultType<Instruction[]>> {
  const { Model, failure } = await InstructionModel(datasetId);

  if (Model) {
    const result = await Model.find<Instruction>(
      { _id: { $in: ids } },
      options?.projection
    );

    return ServiceOperationResult.success(
      result,
      !result.length ? "No instructions in this dataset" : undefined
    );
  } else {
    return failure;
  }
}
