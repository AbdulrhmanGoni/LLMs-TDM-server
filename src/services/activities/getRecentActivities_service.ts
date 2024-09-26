import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import RecentActivitiesModel from "../../models/RecentActivitiesModel";
import type { ServiceOperationResultType } from "../../types/response";

export default async function getRecentActivities_service(
  userId: string
): Promise<ServiceOperationResultType> {
  const result = await RecentActivitiesModel.findOne(
    { _id: userId },
    { _id: 0 },
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
