import createDataset_controller from "./createDataset_controller";
import getDatasets_controller from "./getDatasets_controller.ts";
import deleteDataset_controller from "./deleteDataset_controller";
import updateDataset_controller from "./updateDataset_controller";

class DatasetsController {
  constructor() {}

  createDataset = createDataset_controller;

  getDatasets = getDatasets_controller;

  updateDataset = updateDataset_controller;

  deleteDataset = deleteDataset_controller;
}

const datasetsController = new DatasetsController();

export default datasetsController;
