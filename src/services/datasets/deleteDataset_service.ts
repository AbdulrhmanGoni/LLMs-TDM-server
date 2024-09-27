import DatasetsModel from "../../models/DatasetsModel";
import type { Dataset } from "../../types/datasets";
import type { ServiceOperationResultType } from "../../types/response";
import createTransactionSession from "../../utilities/createTransactionSession";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import activitiesService from "../activities";
import instructionsService from "../instructions";

export default async function deleteDataset_service(
  userId: string,
  datasetId: Dataset["id"]
): Promise<ServiceOperationResultType> {
  const session = await createTransactionSession();

  const result = await DatasetsModel.findByIdAndUpdate(
    { _id: userId },
    { $pull: { datasets: { _id: datasetId } } },
    { projection: { datasets: 1 }, session }
  );

  if (result) {
    const deletedDataset = result.datasets.find(
      (dataset) => dataset.id === datasetId
    );

    if (deletedDataset) {
      const { isSuccess, message } =
        await instructionsService.deleteAllDatasetInstructions(datasetId, {
          session,
        });

      if (isSuccess) {
        activitiesService.registerDatasetActivity(
          userId,
          {
            name: deletedDataset.name,
            description: deletedDataset.description,
            _id: deletedDataset._id,
          },
          new Date(),
          "Deletion"
        );
        await session.commitTransaction();
        return ServiceOperationResult.success(
          true,
          `The dataset was deleted successfully`
        );
      } else {
        session.abortTransaction();
        return ServiceOperationResult.failure(message);
      }
    } else {
      session.abortTransaction();
      return ServiceOperationResult.failure(
        `There is no dataset with "${datasetId}" id`
      );
    }
  } else {
    session.abortTransaction();
    return ServiceOperationResult.failure(
      `There is no user with "${userId}" id`
    );
  }
}
