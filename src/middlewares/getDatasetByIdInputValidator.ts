import ErrorResponse from "../utilities/ErrorResponse";
import type { Req } from "../types/request";
import RequiredObjectIdRule from "../validation/RequiredObjectIdRule";
import InternalServerErrorResponse from "../utilities/InternalServerErrorResponse";

export default function getDatasetByIdInputValidator(request: Req) {
  try {
    const result = RequiredObjectIdRule().validate(request.params.datasetId);
    if (typeof result === "string") {
      return ErrorResponse(result, 403);
    }
  } catch {
    return InternalServerErrorResponse();
  }
}
