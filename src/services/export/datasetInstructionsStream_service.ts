import type { Dataset } from "../../types/datasets";
import type { DatasetFormat } from "../../types/datasets";
import getDatasetInstructionsReader from "./getDatasetInstructionsReader";

export type DatasetInstructionsStreamOptions = {
  userId: string;
  datasetId: Dataset["id"];
  datasetFormat: DatasetFormat;
  onChunk: (chunk: string, progress: number, done?: boolean) => void;
};

export default async function datasetInstructionsStream_service({
  userId,
  datasetId,
  datasetFormat,
  onChunk,
}: DatasetInstructionsStreamOptions) {
  const { cursor, dataset, failure } = await getDatasetInstructionsReader(
    userId,
    datasetId
  );
  if (cursor) {
    const instructionsPerchunks = 10;
    const totalChunks = Math.ceil(
      dataset.instructionsCount / instructionsPerchunks
    );
    let progress = 0;
    let done = false;

    await cursor.eachAsync(
      async (instruction, i) => {
        progress = +(((i + 1) / totalChunks) * 100).toFixed(2);
        done = i + 1 === totalChunks;
        onChunk(
          instruction.reduce((chunk, instruction) => {
            chunk += datasetFormat.formater({
              systemMessage: instruction.systemMessage || undefined,
              question: instruction.question,
              answer: instruction.answer,
            });

            if (done && datasetFormat.decorators?.last) {
              return chunk + datasetFormat.decorators?.last || "";
            }

            return chunk;
          }, (!i ? datasetFormat.decorators?.first : "") || ""),
          progress,
          done
        );
      },
      { batchSize: instructionsPerchunks }
    );
  } else {
    throw failure.message;
  }
}
