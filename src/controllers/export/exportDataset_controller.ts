import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import type { Req } from "../../types/request";
import exportService from "../../services/export";
import formaters from "../../services/export/datasetsFormatsRegistry";
import type { DatasetsFormatsTypes } from "../../types/datasets";
import loggerService from "../../services/logger";

export default async function exportDataset_controller(
  request: Req
): Promise<Response> {
  try {
    const {
      message,
      isSuccess,
      result: Stream,
    } = await exportService.exportDataset(
      request.userId,
      request.params.datasetId,
      formaters[request.search.format as DatasetsFormatsTypes]
    );

    if (isSuccess && Stream) {
      return new Response(Stream, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename="dataset-${request.params.datasetId
            }.${request.search.format.toLowerCase()}"`,
        },
      });
    } else {
      return ErrorResponse(message || "Error while exporting the dataset");
    }
  } catch {
    const message = "Unexpected internal server error";
    loggerService.error(message, {
      userId: request.userId,
      datasetId: request.params.datasetId,
      operation: exportDataset_controller.name,
    })
    return InternalServerErrorResponse(message);
  }
}
