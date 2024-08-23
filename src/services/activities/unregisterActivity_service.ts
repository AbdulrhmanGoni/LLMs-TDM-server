import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import RecentActivitiesModel from "../../models/RecentActivitiesModel";
import type { ActivityFilter, ActivityResource } from "../../types/activities";
import type { ServiceOperationResultType } from "../../types/response";

export default async function unregisterActivities_service(
  resourceName: ActivityResource,
  targetFilter: ActivityFilter
): Promise<ServiceOperationResultType> {
  const updateQuery = {
    $pull: {
      [`recentActivitiesOf${resourceName}`]: targetFilter,
    },
  };

  if (resourceName === "Datasets") {
    updateQuery.$pull.recentActivitiesOfInstructions = {
      datasetId: targetFilter.datasetId,
    };
  }

  const result = await RecentActivitiesModel.updateOne({}, updateQuery);
  if (result.modifiedCount) {
    return ServiceOperationResult.success(true);
  }

  return ServiceOperationResult.failure("Activity registration failed", false);
}
