import createDataset_service from "./createDataset_service";
import getDatasets_service from "./getDatasets_service";
import deleteDataset_service from "./deleteDataset_service";
import updateDataset_service from "./updateDataset_service";
import getDatasetById_service from "./getDatasetById_service";
import incrementInstructionsCount_service from "./incrementInstructionsCount_service";
import datasetsOverview_service from "./datasetsOverview_service";
import setDatasetRepository_service from "./setDatasetRepository_service";

class DatasetsService {
  constructor() {}

  createDataset = createDataset_service;

  getDatasetById = getDatasetById_service;

  getDatasets = getDatasets_service;

  updateDataset = updateDataset_service;

  deleteDataset = deleteDataset_service;

  incrementInstructionsCount = incrementInstructionsCount_service;

  datasetsOverview = datasetsOverview_service;

  setDatasetRepository = setDatasetRepository_service;
}

const datasetsService = new DatasetsService();

export default datasetsService;
