import ErrorResponse from "../../utilities/ErrorResponse";
import InternalServerErrorResponse from "../../utilities/InternalServerErrorResponse";
import type { Req } from "../../types/request";
import exportService from "../../services/export";
import formaters from "../../services/export/datasetsFormatsRegistry";
import type { DatasetsFormatsTypes } from "../../types/datasets";

export default async function exportDataset_controller(
  request: Req
): Promise<Response> {
  try {
    const {
      message,
      isSuccess,
      result: Stream,
    } = await exportService.exportDataset(
      request.params.datasetId,
      formaters[request.search.format as DatasetsFormatsTypes]
    );

    if (isSuccess && Stream) {
      return new Response(Stream, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename="dataset-${
            request.params.datasetId
          }.${request.search.format.toLowerCase()}"`,
        },
      });
    } else {
      return ErrorResponse(message || "Error while exporting the dataset");
    }
  } catch {
    return InternalServerErrorResponse();
  }
}
