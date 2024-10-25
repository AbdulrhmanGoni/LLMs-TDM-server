import { type ClientSession } from "mongoose";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetModel from "../../models/DatasetsModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function incrementInstructionsCount_service(
  userId: string,
  datasetId: Dataset["id"],
  incrementValue: number = 1,
  session?: ClientSession
): Promise<ServiceOperationResultType> {
  const result = await DatasetModel.updateOne(
    { _id: userId, "datasets._id": datasetId },
    [
      {
        $set: {
          datasets: {
            $map: {
              input: "$datasets",
              as: "dataset",
              in: {
                $cond: {
                  if: { $eq: ["$$dataset._id", { $toObjectId: datasetId }] },
                  then: {
                    $mergeObjects: [
                      "$$dataset",
                      {
                        instructionsCount: {
                          $add: ["$$dataset.instructionsCount", incrementValue],
                        },
                      },
                      {
                        repository: {
                          $cond: {
                            if: { $ifNull: ["$$dataset.repository", false] },
                            then: {
                              $mergeObjects: [
                                "$$dataset.repository",
                                { isUpToDate: false },
                              ],
                            },
                            else: "$$REMOVE",
                          },
                        },
                      },
                    ],
                  },
                  else: "$$dataset",
                },
              },
            },
          },
        },
      },
    ],
    { session }
  );

  if (result.modifiedCount) {
    return ServiceOperationResult.success(
      true,
      operationsResultsMessages.successfulInstructionsCountIncrement
    );
  } else if (!result.matchedCount) {
    return ServiceOperationResult.failure(
      operationsResultsMessages.noDataset(datasetId)
    );
  } else {
    return ServiceOperationResult.failure(
      operationsResultsMessages.failedInstructionsCountIncrement
    );
  }
}
