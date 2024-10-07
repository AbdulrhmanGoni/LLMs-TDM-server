import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetsModel from "../../models/DatasetsModel";
import type { ServiceOperationResultType } from "../../types/response";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function getDatasets_service(
  userId: string
): Promise<ServiceOperationResultType> {
  const result = await DatasetsModel.findOne({ _id: userId });

  if (result) {
    return ServiceOperationResult.success(
      result.datasets,
      result.datasets.length ? undefined : operationsResultsMessages.noDatasets
    );
  } else {
    return ServiceOperationResult.failure(
      operationsResultsMessages.noUser(userId)
    );
  }
}
