import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import datasetsService from "../../services/datasets";
import type { Req } from "../../types/request";

export default async function getDatasets_controller(
  request: Req
): Promise<Response> {
  try {
    const { result, message } = await datasetsService.getDatasets(
      request.userId
    );
    return SuccessResponse(result, message);
  } catch {
    return InternalServerErrorResponse();
  }
}
