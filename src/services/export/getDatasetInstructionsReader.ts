import InstructionModel from "../../models/InstructionModel";
import type { Dataset } from "../../types/datasets";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import datasetsService from "../datasets";

export default async function getDatasetInstructionsReader(
  datasetId: Dataset["id"]
) {
  const {
    isSuccess,
    result: dataset,
    message,
  } = await datasetsService.getDatasetById(datasetId);
  if (isSuccess && dataset) {
    const { Model, failure } = await InstructionModel(datasetId);
    if (Model) {
      return {
        cursor: Model.find().cursor(),
        dataset,
      };
    } else {
      return {
        failure,
      };
    }
  } else {
    return {
      failure: ServiceOperationResult.failure(message),
    };
  }
}
