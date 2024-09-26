import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import datasetsService from "../datasets";

export default async function getDatasetInstructionsReader(
  userId: Dataset["id"],
  datasetId: Dataset["id"]
) {
  const {
    isSuccess,
    result: dataset,
    message,
  } = await datasetsService.getDatasetById(userId, datasetId);
  if (isSuccess && dataset) {
    return {
      cursor: InstructionModel.find({ datasetId }).cursor(),
      dataset,
    };
  } else {
    return {
      failure: ServiceOperationResult.failure(message),
    };
  }
}
