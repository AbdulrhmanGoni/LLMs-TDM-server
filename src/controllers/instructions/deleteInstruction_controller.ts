import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import instructionsService from "../../services/instructions";
import type { Req } from "../../types/request";
import loggerService from "../../services/logger";

export default async function deleteInstruction_controller(
  request: Req
): Promise<Response> {
  try {
    const { result, isSuccess, message } =
      await instructionsService.deleteInstruction(
        request.userId,
        request.search.datasetId,
        request.search.instructionId
      );

    if (isSuccess) {
      return SuccessResponse(result, message);
    }
    return ErrorResponse(
      message || "Failed to delete the instruction from the dataset",
      400
    );
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      datasetId: request.search.datasetId,
      instructionId: request.search.instructionId,
      operation: deleteInstruction_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
