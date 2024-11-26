import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import datasetsService from "../../services/datasets";
import type { Req } from "../../types/request";
import loggerService from "../../services/logger";

export default async function datasetsOverview_controller(
  request: Req
): Promise<Response> {
  try {
    const { result, message } = await datasetsService.datasetsOverview(
      request.userId
    );
    return SuccessResponse(result, message);
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      operation: datasetsOverview_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
