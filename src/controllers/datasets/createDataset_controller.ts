import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import datasetsService from "../../services/datasets";
import type { Req } from "../../types/request";

export default async function createDataset_controller(
  request: Req
): Promise<Response> {
  try {
    const { message, isSuccess, result } = await datasetsService.createDataset(
      request.json
    );

    if (isSuccess) {
      return SuccessResponse(result, message);
    } else {
      return ErrorResponse(message || "Dataset creation failed");
    }
  } catch {
    return InternalServerErrorResponse();
  }
}
