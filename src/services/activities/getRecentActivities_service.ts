import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import UserModel from "../../models/UserModel";
import type { ServiceOperationResultType } from "../../types/response";

export default async function getRecentActivities_service(
  userId: string
): Promise<ServiceOperationResultType> {
  const result = await UserModel.findOne(
    { _id: userId },
    { _id: 0, datasetsActivities: 1, instructionsActivities: 1 },
    { upsert: true }
  );
  return ServiceOperationResult.success(
    result
      ? result
      : {
        datasetsActivities: [],
        instructionsActivities: [],
      }
  );
}
