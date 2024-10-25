import { uploadFile } from "@huggingface/hub";
import { HuggingfaceService } from ".";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import datasetInstructionsStream_service from "../export/datasetInstructionsStream_service";
import formats from "../export/datasetsFormatsRegistry";
import type { DatasetRepositoryBase } from "../../types/huggingface";
import datasetsService from "../datasets";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

type Params = {
  userId: string;
  datasetId: Dataset["id"];
  repository?: DatasetRepositoryBase;
  commitTitle?: string;
  commitDescription?: string;
};

export default async function uploadDatasetRepository_service(
  this: HuggingfaceService,
  {
    userId,
    datasetId,
    repository,
    commitTitle = "Upload a dataset file from LLMs TDM App",
    commitDescription,
  }: Params
): Promise<ServiceOperationResultType> {
  const gettingHuggingfaceAccountOperation = await this.getHuggingfaceAccount(
    userId
  );

  let repo = repository;

  if (!repo) {
    const { isSuccess, result, message } = await datasetsService.getDatasetById(
      userId,
      datasetId
    );

    if (!isSuccess) {
      return ServiceOperationResult.failure(message);
    }

    if (!result?.repository) {
      return ServiceOperationResult.failure(
        operationsResultsMessages.noLinkedDatasetRepository
      );
    }

    repo = {
      name: result.repository.name,
      filePath: result.repository.filePath,
      fileFormat: result.repository.fileFormat,
    };
  }

  const DatasetInstructionsStream = new ReadableStream({
    async pull(controller) {
      try {
        await datasetInstructionsStream_service({
          userId,
          datasetId,
          datasetFormat: formats[repo.fileFormat],
          onChunk(chunk, _progress, done) {
            controller.enqueue(chunk);
            done && controller.close();
          },
        });
      } catch {
        controller.close();
      }
    },
  });

  await uploadFile({
    commitTitle,
    commitDescription,
    file: {
      path: repo.filePath,
      content: await Bun.readableStreamToBlob(DatasetInstructionsStream),
    },
    repo: {
      name: repo.name,
      type: "dataset",
    },
    accessToken: gettingHuggingfaceAccountOperation.result?.accessToken,
  });

  return ServiceOperationResult.success(
    true,
    operationsResultsMessages.successullyDatasetUpload
  );
}
