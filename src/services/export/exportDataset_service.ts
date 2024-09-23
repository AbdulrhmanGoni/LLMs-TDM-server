import type { Dataset } from "../../types/datasets";
import type { DatasetFormat } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import getDatasetInstructionsReader from "./getDatasetInstructionsReader";

export default async function exportDataset_service(
  datasetId: Dataset["id"],
  datasetFormat: DatasetFormat
): Promise<ServiceOperationResultType<ReadableStream>> {
  const { cursor, failure } = await getDatasetInstructionsReader(datasetId);

  if (cursor) {
    const Stream = new ReadableStream({
      async pull(controller) {
        datasetFormat.decorators?.first &&
          controller.enqueue(datasetFormat.decorators.first);

        for (
          let instruction = await cursor.next();
          instruction != null;
          instruction = await cursor.next()
        ) {
          controller.enqueue(
            datasetFormat.formater({
              systemMessage: instruction.systemMessage || undefined,
              question: instruction.question,
              answer: instruction.answer,
            })
          );
        }
        datasetFormat.decorators?.last &&
          controller.enqueue(datasetFormat.decorators.last);

        controller.close();
      },
    });

    return ServiceOperationResult.success(Stream);
  } else {
    return failure;
  }
}
