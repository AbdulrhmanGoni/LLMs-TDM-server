import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import instructionsService from "../../services/instructions";
import type { Req } from "../../types/request";
import loggerService from "../../services/logger";

export default async function addInstruction_controller(
  request: Req
): Promise<Response> {
  try {
    const { result, isSuccess, message } =
      await instructionsService.addInstruction(request.userId, request.json);

    if (isSuccess) {
      return SuccessResponse(result, message);
    }
    return ErrorResponse(
      message || "Failed to add the instruction to the dataset",
      400
    );
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      datasetId: request.json.datasetId,
      operation: addInstruction_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
