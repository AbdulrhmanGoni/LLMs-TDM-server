import DatasetsModel from "../../models/DatasetsModel";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import type { ServiceOperationResultType } from "../../types/response";
import type { UserHuggingfaceAccount } from "../../types/huggingface";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function getHuggingfaceAccount_service(
  userId: string
): Promise<ServiceOperationResultType<UserHuggingfaceAccount>> {
  const userData = await DatasetsModel.findById(userId, {
    huggingfaceAccount: 1,
  });

  if (userData?.huggingfaceAccount) {
    return ServiceOperationResult.success(userData.huggingfaceAccount);
  } else {
    return ServiceOperationResult.success(
      null,
      operationsResultsMessages.noHuggingfaceAccount
    );
  }
}
