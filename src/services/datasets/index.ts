import createDataset_service from "./createDataset_service";
import getDatasets_service from "./getDatasets_service";
import deleteDataset_service from "./deleteDataset_service";
import updateDataset_service from "./updateDataset_service";
import getDatasetsById_service from "./getDatasetById_service";
import incrementInstructionsCount_service from "./incrementInstructionsCount_service";

class DatasetsService {
  constructor() {}

  createDataset = createDataset_service;

  getDatasetsById = getDatasetsById_service;

  getDatasets = getDatasets_service;

  updateDataset = updateDataset_service;

  deleteDataset = deleteDataset_service;

  incrementInstructionsCount = incrementInstructionsCount_service;
}

const datasetsService = new DatasetsService();

export default datasetsService;
