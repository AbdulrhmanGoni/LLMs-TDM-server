import huggingfaceService from "../../services/huggingface";
import loggerService from "../../services/logger";
import type { Req } from "../../types/request";
import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";

export default async function syncDatasetWithRepository_controller(
  request: Req
) {
  try {
    const { isSuccess, message, result } =
      await huggingfaceService.syncDatasetWithRepository({
        userId: request.userId,
        datasetId: request.params.datasetId,
        commitTitle: request.json.commitTitle,
        commitDescription: request.json.commitDescription,
      });

    if (isSuccess) {
      return SuccessResponse(result);
    } else {
      return ErrorResponse(message as string);
    }
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      datasetId: request.params.datasetId,
      operation: syncDatasetWithRepository_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
