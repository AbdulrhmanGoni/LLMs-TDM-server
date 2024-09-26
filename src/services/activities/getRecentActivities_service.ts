import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import RecentActivitiesModel from "../../models/RecentActivitiesModel";
import type { ServiceOperationResultType } from "../../types/response";

export default async function getRecentActivities_service(
  userId: string
): Promise<ServiceOperationResultType> {
  const result = await RecentActivitiesModel.findById(userId, { _id: 0 });

  if (result) {
    return ServiceOperationResult.success(result);
  }

  return ServiceOperationResult.failure(
    `No Activities found for user with ${userId} id`,
    false
  );
}
