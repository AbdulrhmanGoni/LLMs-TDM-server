import huggingfaceService from "../../services/huggingface";
import type { Req } from "../../types/request";
import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";

export default async function unlinkDatasetWithRepository_controller(
  request: Req
) {
  try {
    const { isSuccess, message, result } =
      await huggingfaceService.unlinkDatasetWithRepository({
        userId: request.userId,
        datasetId: request.params.datasetId,
        deleteRepository: request.json.deleteRepository,
        deleteDatasetFile: request.json.deleteDatasetFile,
        commitTitle: request.json.commitTitle,
        commitDescription: request.json.commitDescription,
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
