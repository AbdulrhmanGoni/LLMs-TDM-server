import { HuggingfaceService } from ".";
import type { Dataset } from "../../types/datasets";
import type { DatasetRepositoryBase } from "../../types/huggingface";
import type { ServiceOperationResultType } from "../../types/response";
import datasetsService from "../datasets";

type Params = {
  userId: string;
  datasetId: Dataset["id"];
  repository: DatasetRepositoryBase;
  commitTitle?: string;
  commitDescription?: string;
};

export default async function pushDatasetToRepository_service(
  this: HuggingfaceService,
  { userId, datasetId, repository, commitTitle, commitDescription }: Params
): Promise<ServiceOperationResultType> {
  const settingRepositoryOperation = await datasetsService.setDatasetRepository(
    {
      userId,
      datasetId,
      repository: {
        ...repository,
        syncedAt: new Date(),
        isUpToDate: true,
      },
    }
  );

  if (!settingRepositoryOperation.isSuccess) {
    return settingRepositoryOperation;
  }

  return await this.uploadDatasetRepository({
    userId,
    datasetId,
    repository,
    commitTitle,
    commitDescription,
  });
}
