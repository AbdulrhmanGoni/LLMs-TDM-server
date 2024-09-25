import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import datasetsService from "../../services/datasets";
import type { Req } from "../../types/request";

export default async function getDatasetById_controller(
  request: Req
): Promise<Response> {
  try {
    const { result, message } = await datasetsService.getDatasetById(
      request.userId,
      request.params.datasetId
    );
    return SuccessResponse(result, message);
  } catch {
    return InternalServerErrorResponse();
  }
}
