import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Instruction } from "../../types/instructions";
import type { ServiceOperationResultType } from "../../types/response";
import type { Types } from "mongoose";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function getInstructionsByIds_service(
  ids: Instruction["id"][] | Types.ObjectId[],
  options?: { projection?: string[] | Record<string, boolean | number> }
): Promise<ServiceOperationResultType<Instruction[]>> {
  if (!ids.length) {
    return ServiceOperationResult.failure(
      operationsResultsMessages.noInstructionsIdsProvided
    );
  }

  const result = await InstructionModel.find<Instruction>(
    { _id: { $in: ids } },
    options?.projection
  );

  return ServiceOperationResult.success(
    result,
    !result.length
      ? operationsResultsMessages.noInstructionsFoundByIds
      : undefined
  );
}
