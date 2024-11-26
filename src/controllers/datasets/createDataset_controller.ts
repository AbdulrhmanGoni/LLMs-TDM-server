import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import datasetsService from "../../services/datasets";
import type { Req } from "../../types/request";
import loggerService from "../../services/logger";

export default async function createDataset_controller(
  request: Req
): Promise<Response> {
  try {
    const { message, isSuccess, result } = await datasetsService.createDataset(
      request.userId,
      request.json
    );

    if (isSuccess) {
      return SuccessResponse(result, message, 201);
    } else {
      return ErrorResponse(message || "Dataset creation failed");
    }
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      operation: createDataset_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
