import parsePaginationModel from "../../utilities/parsePaginationModel";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import type { Instruction } from "../../types/instructions";
import type {
  PaginationModel,
  PaginationResponse,
  ServiceOperationResultType,
} from "../../types/response";

export default async function getInstructions_service(
  datasetId: Dataset["id"],
  paginationModel: PaginationModel
): Promise<
  ServiceOperationResultType<PaginationResponse<Instruction, "instructions">>
> {
  const { limit, skip } = parsePaginationModel(paginationModel);

  const { Model, failure } = await InstructionModel(datasetId);

  if (Model) {
    const result = await Model.find<Instruction>(
      {},
      {},
      { limit: limit + 1, skip }
    );

    return ServiceOperationResult.success(
      {
        areThereMore: !!result[limit],
        instructions: result.slice(0, limit),
      },
      !result.length && !skip ? "No instructions in this dataset" : undefined
    );
  } else {
    return failure;
  }
}
