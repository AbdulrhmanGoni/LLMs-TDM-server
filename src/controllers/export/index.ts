import exportDataset_controller from "./exportDataset_controller";
import exportDatasetWS_controller from "./exportDatasetWS_controller";

class ExportDatasetController {
  constructor() {}

  exportDataset = exportDataset_controller;
  exportDatasetWS = exportDatasetWS_controller;
}

const exportDatasetController = new ExportDatasetController();

export default exportDatasetController;
