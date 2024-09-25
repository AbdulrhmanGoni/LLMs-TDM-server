import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetModel from "../../models/DatasetsModel";
import type { ServiceOperationResultType } from "../../types/response";

export default async function datasetsOverview_service(
  userId: string
): Promise<ServiceOperationResultType> {
  const lastMonthDate = new Date(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [result] = await DatasetModel.aggregate([
    { $match: { _id: userId } },
    { $unwind: "$datasets" },
    { $replaceRoot: { newRoot: "$datasets" } },
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
  ]);

  return ServiceOperationResult.success(
    result
      ? result
      : {
          totalDatasets: 0,
          addedDatasetsLastMonth: 0,
        }
  );
}
