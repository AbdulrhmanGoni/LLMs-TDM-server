import type { Req } from "../../types/request";
import exportService from "../../services/export";
import formaters from "../../services/export/datasetsFormatsRegistry";
import type { DatasetsFormatsTypes } from "../../types/datasets";
import type { ServerWebSocket } from "bun";

export default async function exportDatasetWS_controller(
  wsClient: ServerWebSocket<{ req: Req }>
): Promise<void> {
  try {
    const request = wsClient.data.req;
    const chosenFormat =
      formaters[request.search.format as DatasetsFormatsTypes];

    await exportService.exportDatasetWS({
      userId: request.userId,
      datasetId: request.params.datasetId,
      datasetFormat: chosenFormat,
      wsClient,
    });
  } catch (error: any) {
    wsClient.close(4000, error || "Internal Server Error");
  }
}
