import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import datasetsService from "../../services/datasets";
import type { Req } from "../../types/request";
import loggerService from "../../services/logger";

export default async function deleteDataset_controller(
  request: Req
): Promise<Response> {
  try {
    const { message, isSuccess, result } = await datasetsService.deleteDataset(
      request.userId,
      request.params.datasetId
    );

    if (isSuccess) {
      return SuccessResponse(result, message);
    } else {
      return ErrorResponse(message || "Dataset deletion failed");
    }
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      datasetId: request.params.datasetId,
      operation: deleteDataset_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
