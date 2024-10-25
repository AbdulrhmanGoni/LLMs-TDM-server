import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import datasetsService from "../datasets";

type Params = {
  userId: string;
  datasetId: Dataset["id"];
};

export default async function unlinkDatasetWithRepository_service({
  userId,
  datasetId,
}: Params): Promise<ServiceOperationResultType> {
  const unlinkingRepositoryOperation =
    await datasetsService.setDatasetRepository({
      userId,
      datasetId,
      repository: null,
    });

  if (unlinkingRepositoryOperation.isSuccess) {
    return ServiceOperationResult.success(
      true,
      "The Dataset has been unlinked with the repository successfully"
    );
  }

  return unlinkingRepositoryOperation;
}
