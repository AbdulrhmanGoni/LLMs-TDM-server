import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import UserModel from "../../models/UserModel";
import type { Activity, ActivityResource } from "../../types/activities";
import type { ServiceOperationResultType } from "../../types/response";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function registerActivity_service(
  resourceName: ActivityResource,
  activity: Activity,
  userId: string
): Promise<ServiceOperationResultType> {
  const updateQuery = {
    $push: {
      [`${resourceName.toLowerCase()}Activities`]: {
        $each: [activity],
        $position: 0,
        $slice: 5,
      },
    },
  };

  const result = await UserModel.updateOne(
    { _id: userId },
    updateQuery,
    { upsert: true }
  );

  if (result.modifiedCount) {
    return ServiceOperationResult.success(true);
  }

  return ServiceOperationResult.failure(
    operationsResultsMessages.failedActivityRegistration,
    false
  );
}
