import { HuggingfaceService } from ".";
import operationsResultsMessages from "../../constants/operationsResultsMessages";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import createTransactionSession from "../../utilities/createTransactionSession";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import datasetsService from "../datasets";

type Params = {
  userId: string;
  datasetId: Dataset["id"];
  commitTitle?: string;
  commitDescription?: string;
};

export default async function syncDatasetWithRepository_service(
  this: HuggingfaceService,
  { userId, datasetId, commitTitle, commitDescription }: Params
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const updatingRepositoryOperation =
    await datasetsService.setDatasetRepository({
      userId,
      datasetId,
      repository: {
        syncedAt: new Date(),
        isUpToDate: true,
      },
      options: { session },
    });

  if (updatingRepositoryOperation.isSuccess) {
    const uploadingOperation = await this.uploadDatasetRepository({
      userId,
      datasetId,
      commitTitle,
      commitDescription,
    });

    if (uploadingOperation.isSuccess) {
      await session.commitTransaction();
      return ServiceOperationResult.success(
        true,
        operationsResultsMessages.successfulDatasetSyncWithRepository
      );
    }
    session.abortTransaction();
    return uploadingOperation;
  }
  session.abortTransaction();
  return updatingRepositoryOperation;
}
