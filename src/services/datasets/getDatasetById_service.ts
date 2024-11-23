import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetModel from "../../models/UserModel";
import type { Dataset, DatasetDocument } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function getDatasetById_service(
  userId: string,
  datasetId: Dataset["id"]
): Promise<ServiceOperationResultType<DatasetDocument>> {
  const result = await DatasetModel.findOne(
    {
      _id: userId,
      "datasets._id": datasetId,
    },
    { "datasets.$": 1 }
  );

  if (result?.datasets[0]) {
    return ServiceOperationResult.success(result.datasets[0]);
  } else {
    return ServiceOperationResult.failure(
      operationsResultsMessages.noDataset(datasetId)
    );
  }
}
