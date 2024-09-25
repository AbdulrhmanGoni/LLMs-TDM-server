import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetsModel from "../../models/DatasetsModel";
import type { ServiceOperationResultType } from "../../types/response";

export default async function getDatasets_service(
  userId: string
): Promise<ServiceOperationResultType> {
  const result = await DatasetsModel.findOne({ _id: userId });

  return ServiceOperationResult.success(
    result?.datasets || [],
    result?.datasets.length ? undefined : "There are no datasets yet"
  );
}
