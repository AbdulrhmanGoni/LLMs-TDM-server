import huggingfaceService from "../../services/huggingface";
import loggerService from "../../services/logger";
import type { Req } from "../../types/request";
import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";

export default async function getHuggingfaceAccount_controller(request: Req) {
  try {
    const { isSuccess, message, result } =
      await huggingfaceService.getHuggingfaceAccount(request.userId);

    if (isSuccess) {
      return SuccessResponse(
        result
          ? {
            username: result.username,
            emailVerified: result.emailVerified,
          }
          : undefined
      );
    } else {
      return ErrorResponse(message as string);
    }
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      operation: getHuggingfaceAccount_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
