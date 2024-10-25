import huggingfaceService from "../../services/huggingface";
import type { Req } from "../../types/request";
import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";

export default async function pushDatasetToRepository_controller(request: Req) {
  try {
    const { isSuccess, message, result } =
      await huggingfaceService.pushDatasetToRepository({
        userId: request.userId,
        datasetId: request.params.datasetId,
        ...request.json,
      });

    if (isSuccess) {
      return SuccessResponse(result);
    } else {
      return ErrorResponse(message as string);
    }
  } catch {
    return InternalServerErrorResponse();
  }
}
