import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import RecentActivitiesModel from "../../models/RecentActivitiesModel";
import type { Activity, ActivityResource } from "../../types/activities";
import type { ServiceOperationResultType } from "../../types/response";

export default async function registerActivity_service(
  resourceName: ActivityResource,
  activity: Activity
): Promise<ServiceOperationResultType> {
  const updateQuery = [
    {
      $set: {
        [`recentActivitiesOf${resourceName}`]: {
          $concatArrays: [
            [activity],
            { $slice: [`$recentActivitiesOf${resourceName}`, 4] },
          ],
        },
      },
    },
  ];
  const result = await RecentActivitiesModel.updateOne({}, updateQuery);
  if (result.modifiedCount) {
    return ServiceOperationResult.success(true);
  }

  return ServiceOperationResult.failure("Activity registration failed", false);
}
