import createDataset_controller from "./createDataset_controller";
import getDatasets_controller from "./getDatasets_controller";
import getDatasetById_controller from "./getDatasetById_controller";
import deleteDataset_controller from "./deleteDataset_controller";
import updateDataset_controller from "./updateDataset_controller";
import datasetsOverview_controller from "./datasetsOverview_controller";

class DatasetsController {
  constructor() {}

  createDataset = createDataset_controller;

  getDatasets = getDatasets_controller;

  getDatasetById = getDatasetById_controller;

  updateDataset = updateDataset_controller;

  deleteDataset = deleteDataset_controller;

  datasetsOverview = datasetsOverview_controller;
}

const datasetsController = new DatasetsController();

export default datasetsController;
