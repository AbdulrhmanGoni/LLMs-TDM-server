import { Types } from "mongoose";
import DatasetModel from "../../models/DatasetsModel";
import type { Dataset, UpdateDatasetInput } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import activitiesService from "../activities";

export default async function updateDataset_service(
  userId: string,
  datasetId: Dataset["id"],
  updateData: UpdateDatasetInput
): Promise<ServiceOperationResultType> {
  const result = await DatasetModel.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        [`datasets.$[dataset].name`]: updateData.name,
        [`datasets.$[dataset].description`]: updateData.description,
      },
    },
    {
      new: true,
      arrayFilters: [{ "dataset._id": datasetId }],
      projection: { datasets: 1 },
    }
  );

  if (result) {
    activitiesService.registerDatasetActivity(
      userId,
      new Types.ObjectId(datasetId),
      new Date(),
      "Modification"
    );
    return ServiceOperationResult.success(
      result.datasets.find((dataset) => dataset.id === datasetId),
      `The dataset updated successfully`
    );
  } else {
    return ServiceOperationResult.failure(`Dataset not found to update`);
  }
}
