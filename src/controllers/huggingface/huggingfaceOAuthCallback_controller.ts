import huggingfaceService from "../../services/huggingface";
import loggerService from "../../services/logger";
import type { Req } from "../../types/request";
import ErrorResponse from "../../utilities/ErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";

export default async function huggingfaceOAuthCallback_controller(
  request: Req
) {
  try {
    const { isSuccess, message, result } =
      await huggingfaceService.huggingfaceOAuthCallback(
        request.userId,
        request.search.code
      );

    if (isSuccess) {
      return SuccessResponse(result, message);
    } else {
      return ErrorResponse({
        datasetId: request.search.datasetId,
        errorTitle: "Huggingface OAuth process failed",
        message,
      });
    }
  } catch {
    const message = "Unexpected error happened while huggingface OAuth process.";
    loggerService.error(message, {
      userId: request.userId,
      datasetId: request.search.datasetId,
      operation: huggingfaceOAuthCallback_controller.name,
    })
    return ErrorResponse({
      datasetId: request.search.datasetId,
      error: "Internal Server Error",
      error_description: message,
    });
  }
}
