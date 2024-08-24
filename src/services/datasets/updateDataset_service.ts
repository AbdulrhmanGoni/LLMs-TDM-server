import DatasetModel from "../../models/DatasetModel";
import type { Dataset, UpdateDatasetInput } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import activitiesService from "../activities";

export default async function updateDataset_service(
  datasetId: Dataset["id"],
  updateData: UpdateDatasetInput
): Promise<ServiceOperationResultType> {
  const filter = { _id: datasetId };
  const dataset = await DatasetModel.findOneAndUpdate(filter, updateData, {
    new: true,
  });

  if (dataset) {
    activitiesService.registerDatasetActivity(
      dataset._id,
      dataset.updatedAt,
      "Modification"
    );
    return ServiceOperationResult.success(
      updateData,
      `The dataset updated successfully`
    );
  } else {
    return ServiceOperationResult.failure(`Dataset not found to update`);
  }
}
