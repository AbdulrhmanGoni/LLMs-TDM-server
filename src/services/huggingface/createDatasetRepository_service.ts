import { createRepo } from "@huggingface/hub";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import { HuggingfaceService } from ".";
import type { CreateDatasetRepositoryInput } from "../../types/huggingface";

export default async function createDatasetRepository_service(
  this: HuggingfaceService,
  userId: string,
  { name, license = "mit" }: CreateDatasetRepositoryInput
) {
  const {
    isSuccess,
    result: huggingfaceAccount,
    message,
  } = await this.getHuggingfaceAccount(userId);

  if (isSuccess && huggingfaceAccount) {
    const result = await createRepo({
      accessToken: huggingfaceAccount.accessToken,
      repo: {
        name: `${huggingfaceAccount.username}/${name}`,
        type: "dataset",
      },
      license,
    });

    return ServiceOperationResult.success(result);
  } else {
    return ServiceOperationResult.failure(message);
  }
}
