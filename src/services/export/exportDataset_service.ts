import type { Dataset } from "../../types/datasets";
import type { DatasetFormat } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import datasetInstructionsStream_service from "./datasetInstructionsStream_service";

export default async function exportDataset_service(
  userId: string,
  datasetId: Dataset["id"],
  datasetFormat: DatasetFormat
): Promise<ServiceOperationResultType<ReadableStream>> {
  const Stream = new ReadableStream({
    async pull(controller) {
      await datasetInstructionsStream_service({
        userId,
        datasetId,
        datasetFormat,
        onChunk(chunk, _progress, done) {
          controller.enqueue(chunk);
          done && controller.close();
        },
      });
    },
  });

  return ServiceOperationResult.success(Stream);
}
