import DatasetsModel from "../../models/DatasetsModel";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import type { ServiceOperationResultType } from "../../types/response";
import type { UserHuggingfaceAccount } from "../../types/huggingface";
import operationsResultsMessages from "../../constants/operationsResultsMessages";
import type { HuggingfaceService } from ".";

export default async function getHuggingfaceAccount_service(
  this: HuggingfaceService,
  userId: string
): Promise<ServiceOperationResultType<UserHuggingfaceAccount>> {
  const userData = await DatasetsModel.findById(userId, {
    huggingfaceAccount: 1,
  });

  if (userData?.huggingfaceAccount) {
    if (userData.huggingfaceAccount.accessTokenExpiresIn < new Date()) {
      const refreshingTokenResult = await this.refreshHuggingfaceAccessToken(
        userId,
        userData.huggingfaceAccount.refreshToken
      );

      if (!refreshingTokenResult.isSuccess) {
        return ServiceOperationResult.failure(
          "Failed to get user's Huggingface account"
        );
      }

      return ServiceOperationResult.success(refreshingTokenResult.result);
    }

    return ServiceOperationResult.success(userData.huggingfaceAccount);
  }

  return ServiceOperationResult.success(
    null,
    operationsResultsMessages.noHuggingfaceAccount
  );
}
