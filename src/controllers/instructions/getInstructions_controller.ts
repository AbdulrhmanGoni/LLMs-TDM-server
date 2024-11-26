import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import instructionsService from "../../services/instructions";
import type { Req } from "../../types/request";
import { isValidObjectId } from "mongoose";
import loggerService from "../../services/logger";

export default async function getInstructions_controller(
  request: Req
): Promise<Response> {
  try {
    const { datasetId, page, pageSize } = request.search;
    if (typeof datasetId === "string" && isValidObjectId(datasetId)) {
      const { result, isSuccess, message } =
        await instructionsService.getInstructions(datasetId, {
          page: +page,
          pageSize: +pageSize,
        });

      if (isSuccess) {
        return SuccessResponse(result, message);
      } else {
        return ErrorResponse(
          message || "Failed to bring the instructions",
          400
        );
      }
    } else {
      return ErrorResponse("The passed id is not a valid id");
    }
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      datasetId: request.search.datasetId,
      operation: getInstructions_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
