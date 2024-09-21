import datasetsController from "../controllers/datasets";
import type { RouterType } from "../router/Router";
import createDatasetInputValidator from "../middlewares/createDatasetInputValidator";
import deleteDatasetInputValidator from "../middlewares/deleteDatasetInputValidator";
import updateDatasetInputValidator from "../middlewares/updateDatasetInputValidator";
import getDatasetByIdInputValidator from "../middlewares/getDatasetByIdInputValidator";

export default function datasetsRoutesRegisterer(router: RouterType): void {
  const baseRoute = "/datasets";

  router.GET(baseRoute, datasetsController.getDatasets);

  router.GET(`${baseRoute}/overview`, datasetsController.datasetsOverview);

  router.GET(
    `${baseRoute}/:datasetId`,
    getDatasetByIdInputValidator,
    datasetsController.getDatasetById
  );

  router.POST(
    baseRoute,
    createDatasetInputValidator,
    datasetsController.createDataset
  );

  router.DELETE(
    `${baseRoute}/:datasetId`,
    deleteDatasetInputValidator,
    datasetsController.deleteDataset
  );

  router.PATCH(
    `${baseRoute}/:datasetId`,
    updateDatasetInputValidator,
    datasetsController.updateDataset
  );
}
