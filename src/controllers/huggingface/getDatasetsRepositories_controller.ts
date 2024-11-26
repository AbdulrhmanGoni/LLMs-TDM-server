import huggingfaceService from "../../services/huggingface";
import loggerService from "../../services/logger";
import type { Req } from "../../types/request";
import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";

export default async function getDatasetsRepositories_controller(request: Req) {
  try {
    const { isSuccess, message, result } =
      await huggingfaceService.getDatasetsRepositories(request.userId);

    if (isSuccess) {
      return SuccessResponse(result);
    } else {
      return ErrorResponse(message as string);
    }
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      operation: getDatasetsRepositories_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
