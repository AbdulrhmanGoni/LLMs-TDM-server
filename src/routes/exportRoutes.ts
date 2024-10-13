import exportController from "../controllers/export";
import exportDatasetInputValidator, {
  exportDatasetInputValidatorWS,
} from "../middlewares/exportDatasetInputValidator";
import type { RouterType } from "../router/Router";

export default function exportRoutesRegisterer(router: RouterType): void {
  router.GET(
    "/export/:datasetId",
    exportDatasetInputValidator,
    exportController.exportDataset
  );

  router.WS(
    "/ws/export/:datasetId",
    exportDatasetInputValidatorWS,
    exportController.exportDatasetWS
  );
}
