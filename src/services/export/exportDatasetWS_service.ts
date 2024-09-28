import type { ServerWebSocket } from "bun";
import type { Dataset } from "../../types/datasets";
import type { DatasetFormat } from "../../types/datasets";
import datasetInstructionsStream_service from "./datasetInstructionsStream_service";
import type { Req } from "../../types/request";

type ExportDatasetWSProps = {
  userId: string;
  datasetId: Dataset["id"];
  datasetFormat: DatasetFormat;
  wsClient: ServerWebSocket<{ req: Req }>;
};

export default async function exportDatasetWS_service({
  userId,
  datasetId,
  datasetFormat,
  wsClient,
}: ExportDatasetWSProps) {
  await datasetInstructionsStream_service({
    userId,
    datasetId,
    datasetFormat,
    onChunk(chunk, progress, done) {
      wsClient.send(JSON.stringify({ chunk, progress, done }));
      done && wsClient.close();
    },
  });
}
