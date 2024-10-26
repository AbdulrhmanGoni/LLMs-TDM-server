import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import { deleteRepo, deleteFile, type RepoDesignation } from "@huggingface/hub";
import datasetsService from "../datasets";
import createTransactionSession from "../../utilities/createTransactionSession";
import loggerService from "../logger";
import { HuggingfaceService } from ".";

type Params = {
  userId: string;
  datasetId: Dataset["id"];
  deleteRepository?: boolean;
  deleteDatasetFile?: boolean;
  commitTitle?: string;
  commitDescription?: string;
};

export default async function unlinkDatasetWithRepository_service(
  this: HuggingfaceService,
  {
    userId,
    datasetId,
    deleteRepository,
    deleteDatasetFile,
    commitTitle,
    commitDescription,
  }: Params
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const unlinkingRepositoryOperation =
    await datasetsService.setDatasetRepository({
      userId,
      datasetId,
      repository: null,
      options: { session },
    });

  if (unlinkingRepositoryOperation.isSuccess) {
    const gettingHFAccountOperation = await this.getHuggingfaceAccount(userId);

    if (
      gettingHFAccountOperation.isSuccess &&
      gettingHFAccountOperation.result
    ) {
      try {
        if (unlinkingRepositoryOperation.result?.repository) {
          const repoAndToken: { accessToken: string; repo: RepoDesignation } = {
            accessToken: gettingHFAccountOperation.result.accessToken,
            repo: {
              type: "dataset",
              name: unlinkingRepositoryOperation.result.repository.name,
            },
          };
          if (deleteRepository) {
            await deleteRepo(repoAndToken);
          } else {
            if (deleteDatasetFile) {
              await deleteFile({
                ...repoAndToken,
                path: unlinkingRepositoryOperation.result.repository.filePath,
                commitTitle,
                commitDescription,
              });
            }
          }
        }

        await session.commitTransaction();

        return ServiceOperationResult.success(
          true,
          "The Dataset has been unlinked with the repository successfully"
        );
      } catch (error: any) {
        const message =
          "Failed to delete the dataset repository after unlinking it with the dataset";
        loggerService.error(error?.message || message, {
          datasetId,
          userId,
          service: "unlinkDatasetWithRepository",
        });

        return ServiceOperationResult.failure(message);
      }
    } else {
      return gettingHFAccountOperation;
    }
  }

  return unlinkingRepositoryOperation;
}
