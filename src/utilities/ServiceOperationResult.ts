import type { ServiceOperationResultType as SORT } from "../types/response";

export default class ServiceOperationResult {
  public static success(
    result?: SORT["result"],
    message?: SORT["message"]
  ): SORT {
    return {
      result,
      isSuccess: true,
      message,
    };
  }

  public static failure(
    message: SORT["message"],
    result: SORT["result"] = null
  ): SORT {
    return {
      result,
      isSuccess: false,
      message,
    };
  }
}
