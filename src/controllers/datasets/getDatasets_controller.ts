import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import datasetsService from "../../services/datasets";
import type { Req } from "../../types/request";
import ErrorResponse from "../../utilities/ErrorResponse";

export default async function getDatasets_controller(
  request: Req
): Promise<Response> {
  try {
    const { isSuccess, result, message } = await datasetsService.getDatasets(
      request.userId
    );
    if (isSuccess) {
      return SuccessResponse(result, message);
    } else {
      return ErrorResponse(message as string, 404);
    }
  } catch {
    return InternalServerErrorResponse();
  }
}
