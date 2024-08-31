import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import SuccessResponse from "../../utilities/SuccessResponse";
import instructionsService from "../../services/instructions";
import type { Req } from "../../types/request";

export default async function addInstruction_controller(
  request: Req
): Promise<Response> {
  try {
    const { result, isSuccess, message } =
      await instructionsService.addInstruction(request.json);

    if (isSuccess) {
      return SuccessResponse(result, message);
    }
    return ErrorResponse(
      message || "Failed to add the instruction to the dataset",
      400
    );
  } catch {
    return InternalServerErrorResponse();
  }
}
