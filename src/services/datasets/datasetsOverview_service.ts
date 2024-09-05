import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetModel from "../../models/DatasetModel";
import type { ServiceOperationResultType } from "../../types/response";

export default async function datasetsOverview_service(): Promise<ServiceOperationResultType> {
  const lastMonthDate = new Date(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [result] = await DatasetModel.aggregate([
    {
      $group: {
        _id: "dataset",
        totalDatasets: { $count: {} },
        addedDatasetsLastMonth: {
          $sum: {
            $cond: {
              if: {
                $gte: ["$createdAt", lastMonthDate],
              },
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    { $unset: ["_id"] },
  ]);

  return ServiceOperationResult.success(result ? result : {});
}
