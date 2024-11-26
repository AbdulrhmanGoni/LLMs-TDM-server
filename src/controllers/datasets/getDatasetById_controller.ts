import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import datasetsService from "../../services/datasets";
import type { Req } from "../../types/request";
import ErrorResponse from "../../utilities/ErrorResponse";
import loggerService from "../../services/logger";

export default async function getDatasetById_controller(
  request: Req
): Promise<Response> {
  try {
    const { isSuccess, result, message } = await datasetsService.getDatasetById(
      request.userId,
      request.params.datasetId
    );
    if (isSuccess) {
      return SuccessResponse(result, message);
    } else {
      return ErrorResponse(message || "Error while getting the dataset");
    }
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      datasetId: request.params.datasetId,
      operation: getDatasetById_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
