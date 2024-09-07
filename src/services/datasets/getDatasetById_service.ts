import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetModel from "../../models/DatasetModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";

export default async function getDatasetById_service(
  id: Dataset["id"]
): Promise<ServiceOperationResultType<Dataset>> {
  const result = await DatasetModel.findById(id);
  if (result) {
    return ServiceOperationResult.success(result);
  } else {
    return ServiceOperationResult.failure(
      `There is no dataset with "${id}" id`
    );
  }
}
