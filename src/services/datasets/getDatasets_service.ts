import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import DatasetModel from "../../models/DatasetModel";
import type { ServiceOperationResultType } from "../../types/response";

export default async function getDatasets_service(): Promise<ServiceOperationResultType> {
  const result = await DatasetModel.find({});
  return ServiceOperationResult.success(
    result,
    result.length ? undefined : "There are no datasets yet"
  );
}
