import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import UserModel from "../../models/UserModel";
import type { ServiceOperationResultType } from "../../types/response";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function getDatasets_service(
  userId: string
): Promise<ServiceOperationResultType> {
  const result = await UserModel.findOne({ _id: userId }, { datasets: true });

  return ServiceOperationResult.success(
    result?.datasets || [],
    result?.datasets.length ? undefined : operationsResultsMessages.noDatasets
  );
}
