import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import type { Req } from "../../types/request";
import activitiesService from "../../services/activities";

export default async function getRecentActivities_controller(
  request: Req
): Promise<Response> {
  try {
    const { message, isSuccess, result } =
      await activitiesService.getRecentActivities(request.userId);

    if (isSuccess) {
      return SuccessResponse(result, message);
    } else {
      return ErrorResponse(
        message || "Error while getting the recent activity",
        400
      );
    }
  } catch {
    return InternalServerErrorResponse();
  }
}
