import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import instructionsService from "../../services/instructions";
import type { Req } from "../../types/request";
import loggerService from "../../services/logger";

export default async function updateInstruction_controller(
  request: Req
): Promise<Response> {
  try {
    const { isSuccess, message, result } =
      await instructionsService.updateInstruction(
        request.userId,
        request.search.datasetId,
        request.search.instructionId,
        request.json
      );

    if (isSuccess) {
      return SuccessResponse(result, message);
    }

    return ErrorResponse(message || "Failed to update the instruction");
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      datasetId: request.search.datasetId,
      instructionId: request.search.instructionId,
      operation: updateInstruction_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
